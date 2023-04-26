import { useSession } from "next-auth/react";
import CardComponent from "@/components/card";
import { Button, Grid, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import NextRouter from "next/router";

import Layout from "@/components/layout";

const Orders = () => {
  const { status, data } = useSession();
  const [orders, setOrders] = useState([]);

  const getOrders = useCallback(async () => {
    try {
      if (status === "authenticated" && data.token.role === "buyer") {
        const response = await axios.get(`/api/orders/?cId=${data.token.id}`);
        setOrders(response.data);
        return;
      }
    } catch (err) {
      console.log(err);
    }
  }, [status, data]);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  const handleReturnProduct = async (orderIndex, productIndex) => {
    try {
      //pop up a dialog to ask reason for return and then send it to the backend
      const reason = prompt("Please enter the reason for return");
      if (reason == null || reason == "") {
        alert("Please enter the reason for return");
        return;
      }

      const response = await axios.post("/api/return", {
        oId: orders[orderIndex].oId,
        pId: orders[orderIndex].items[productIndex].pId,
        rDesc: reason,
        rStatus: 0,
      });

      if (response.status === 200) {
        alert("Return request sent successfully");
      } else {
        alert("Return request failed");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <Grid container spacing={2}>
        {orders.map((order, orderIndex) => (
          <Grid item xs={12} key={order.oId}>
            <Typography variant="h4" component="h1">
              Order #{order.oId}
            </Typography>
            {order.items.map((item, productIndex) => (
              <Grid item xs={12} key={item.pId}>
                <Paper sx={{ p: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: 100, height: 100, marginRight: "16px" }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <Typography variant="h6">{item.name}</Typography>
                      <Typography variant="subtitle1">{item.desc}</Typography>
                      <Typography variant="subtitle2">
                        Price: ${item.price}
                      </Typography>
                      <Typography variant="subtitle2">
                        Quantity: {item.quantity}
                      </Typography>
                      {!item.returned && (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() =>
                            handleReturnProduct(orderIndex, productIndex)
                          }
                        >
                          Return
                        </Button>
                      )}

                      <Button
                        onClick={() => {
                          NextRouter.push("/track");
                        }}
                      >
                        Track
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default Orders;
