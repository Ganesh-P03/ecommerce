/*
props.orders=[
    {
        "oId": 15,
        "timestamp": "Wed Apr 26 2023",
        "quantity": 1,
        "pName": "Apple Watch",
        "account": "654265248527"
    },
    {
        "oId": 9,
        "timestamp": "Tue Apr 25 2023",
        "quantity": 1,
        "pName": "Apple Watch",
        "account": "654265248527"
    },
    {
        "oId": 9,
        "timestamp": "Tue Apr 25 2023",
        "quantity": 1,
        "pName": "HomePod mini",
        "account": "654265248527"
    },
    {
        "oId": 7,
        "timestamp": "Tue Apr 25 2023",
        "quantity": 1,
        "pName": "Apple Watch",
        "account": "654265248527"
    },
    {
        "oId": 6,
        "timestamp": "Tue Apr 25 2023",
        "quantity": 1,
        "pName": "Apple Watch",
        "account": "654265248527"
    },
    {
        "oId": 4,
        "timestamp": "Tue Apr 25 2023",
        "quantity": 1,
        "pName": "Apple Watch",
        "account": "654265248527"
    },
    {
        "oId": 3,
        "timestamp": "Tue Apr 25 2023",
        "quantity": 2,
        "pName": "Apple Watch",
        "account": "654265248527"
    },
    {
        "oId": 3,
        "timestamp": "Tue Apr 25 2023",
        "quantity": 1,
        "pName": "Airpods Pro ",
        "account": "654265248527"
    },
    {
        "oId": 2,
        "timestamp": "Tue Apr 25 2023",
        "quantity": 2,
        "pName": "Apple Watch",
        "account": "654265248527"
    },
    {
        "oId": 2,
        "timestamp": "Tue Apr 25 2023",
        "quantity": 1,
        "pName": "Airpods Pro ",
        "account": "654265248527"
    },
    {
        "oId": 1,
        "timestamp": "Tue Apr 25 2023",
        "quantity": 2,
        "pName": "Apple Watch",
        "account": "654265248527"
    }
]

create a table using mui

*/

import React, { useState, useEffect, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";

const Orders = (props) => {
  const [orders, setOrders] = useState([]);

  const getOrders = useCallback(async () => {
    const response = await axios.get(`/api/getOrdersForSId/?sId=${props.id}`);
    setOrders(response.data);
  }, [props.id]);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell align="right">Product Name</TableCell>

            <TableCell align="right">Quantity</TableCell>

            <TableCell align="right">Payment</TableCell>
            <TableCell align="right">Timestamp</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.oId}>
              <TableCell component="th" scope="row">
                {order.oId}
              </TableCell>
              <TableCell align="right">{order.pName}</TableCell>
              <TableCell align="right">{order.quantity}</TableCell>
              <TableCell align="right">{order.account}</TableCell>
              <TableCell align="right">{order.timestamp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Orders;
