import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "../components/Layout";
import PaymentForm from "../components/paymentForm";
import Review from "../components/review";
import { useSession } from "next-auth/react";
import { useState } from "react";
import PendingIcon from "@mui/icons-material/Pending";
import axios from "axios";

const steps = ["Review your order", "Payment"];

const theme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const { status, data } = useSession();

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvv, setCvv] = useState("");

  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    setLoading(true);

    try {
      if (status === "authenticated" && data.token.role === "buyer") {
        const response = await axios.get(`/api/cart/${data.token.id}`);
        const cartItems = response.data;
        const total = cartItems.reduce((acc, item) => {
          return acc + item.pCost * item.quantity;
        }, 0);

        //check if card is valid
        //check if card has enough funds
        const card = {
          name: cardName,
          accountNumber: cardNumber,
          total: total,
          cvv: cvv,
          expiryDate: expDate,
        };

        const paymentResponse = await axios.post("/api/bank/payment", card);
        console.log(paymentResponse);

        if (paymentResponse.status === 200) {
          const order = {
            cId: data.token.id,
            items: cartItems,
          };
          await axios.post("/api/orders", order);
          await axios.delete(`/api/cart/${data.token.id}`);
          //alert("Order placed successfully");

          router.push("/orders");
        } else {
          setLoading(false);
          return;
        }
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  function getStepContent(step) {
    if (loading) {
      return (
        <>
          <PendingIcon />
          <h1>Please wait while we process your order</h1>
        </>
      );
    }

    switch (step) {
      case 0:
        return <Review id={status === "authenticated" ? data.token.id : -1} />;

      case 1:
        return (
          <PaymentForm
            cardName={setCardName}
            cardNumber={setCardNumber}
            expDate={setExpDate}
            cvv={setCvv}
          />
        );
      case 2:
        return (
          <>
            <PendingIcon />
            <h1>Please wait while we process your order</h1>
          </>
        );
      default:
        throw new Error("Unknown step");
    }
  }

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      //disable button
      //show loading
      //make api call to place order
      //redirect to orders page

      await handlePlaceOrder();
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>{getStepContent(activeStep)}</React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                    className="orderBtn"
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Paper>
        </Container>
      </ThemeProvider>
    </Layout>
  );
}
