import React from "react";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect, useCallback } from "react";
import {
  Typography,
  Link,
  Button,
  Grid,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import Title from "@/components/seller/title";
import axios from "axios";

export default function Advertiser() {
  const { status, data } = useSession();

  console.log(status, data);

  //   if (
  //     status !== "authenticated" ||
  //     (data.token && data.token.role !== "advertiser")
  //   ) {
  //     return <h1>Not Authenticated</h1>;
  //   }

  const [Balance, setBalance] = useState(0);
  const [offerName, setOfferName] = useState("");
  const [pId, setPId] = useState("");
  const [offerDesc, setOfferDesc] = useState("");
  const [discount, setDiscount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const getBalance = useCallback(async () => {
    const response = await axios.get(`/api/bank/account/?id=13`);
    setBalance(response.data.balance);
  }, []);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const giverId = data.token.id;
      const response = await axios.post(`/api/offer`, {
        offerName,
        pId,
        offerDesc,
        discount,
        startDate,
        endDate,
        giverId,
      });

      alert("Offer added successfully");
    } catch (err) {
      console.log(err);
      alert("Offer addition failed");
    }
  };

  const styles = {
    formContainer: {
      "@media (min-width: 600px)": {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
      },
    },
    inputContainer: {
      marginBottom: "16px",
      // "@media (min-width: 600px)": {
      //   marginRight: "16px",
      //   width: "50%",
      // },
    },
    tableContainer: {
      marginTop: "16px",
      backgroundColor: "#f5f5f5",
    },
    tableHead: {
      backgroundColor: "#3f51b5",
      color: "#fff",
    },
    itemName: {
      fontWeight: "bold",
    },
    totalQuantity: {
      fontWeight: "bold",
      textAlign: "right",
    },
    addButton: {
      marginLeft: "16px",
    },
    deleteButton: {
      padding: "4px",
    },
  };

  return (
    <div>
      <h1>Advertiser</h1>

      <React.Fragment>
        <Title>Balance</Title>
        <Typography component="p" variant="h4">
          ${Balance}
        </Typography>
        <Typography color="text.secondary" sx={{ flex: 1 }}>
          {new Date().toDateString()}
        </Typography>
        <div>
          <Link color="primary" href="#">
            add funds
          </Link>
        </div>
      </React.Fragment>

      <div>
        <Typography variant="h4" component="h1" gutterBottom>
          Add Offer
        </Typography>
        <form onSubmit={handleSubmit}>
          <div style={styles.formContainer}>
            <div style={styles.inputContainer}>
              <TextField
                fullWidth
                label="Offer Name"
                value={offerName}
                onChange={(e) => setOfferName(e.target.value)}
              />
              <TextField
                fullWidth
                label="Product ID"
                value={pId}
                onChange={(e) => setPId(e.target.value)}
              />
              <TextField
                fullWidth
                label="Description"
                value={offerDesc}
                onChange={(e) => setOfferDesc(e.target.value)}
              />
              <TextField
                fullWidth
                label="Discount Percent"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
              <TextField
                fullWidth
                label="Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <TextField
                fullWidth
                label="End Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={styles.submitButton}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
