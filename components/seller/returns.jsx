//tabel displaying the returns requested to seller
//use mui
//button to accept or reject the return

import { useCallback, useState, useEffect } from "react";

import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Grid,
} from "@mui/material";

import AcceptIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const styles = {
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
};

const Returns = (props) => {
  const [returns, setReturns] = useState([]);

  const getReturns = useCallback(async () => {
    try {
      const response = await axios.get(`/api/return/?sId=${props.id}`);
      console.log(props.id);
      console.log(response.data);
      setReturns(response.data);
    } catch (err) {
      console.log(err);
    }
  }, [props.id]);

  useEffect(() => {
    getReturns();
  }, [getReturns]);

  const handleAccept = async (id, index) => {
    try {
      const response = await axios.put(`/api/return`, {
        rId: id,
        rStatus: "1",
      });

      await axios.post("/api/orders", {
        cId: returns[index].cId,
        cAccountNumber: returns[index].account,
        revertBack: "1",
      });

      //filter the returns array
      const newReturns = returns.filter((item) => item.rId !== id);
      setReturns(newReturns);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id, index) => {
    try {
      const response = await axios.put(`/api/return}`, {
        rId: id,
        rStatus: "-1",
      });

      const newReturns = returns.filter((item) => item.rId !== id);
      setReturns(newReturns);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TableContainer component={Paper} style={styles.tableContainer}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={styles.tableHead}>Product Name</TableCell>
            <TableCell style={styles.tableHead}>Quantity</TableCell>
            <TableCell style={styles.tableHead}>Sold Price</TableCell>
            <TableCell style={styles.tableHead}>Sold Date</TableCell>
            <TableCell style={styles.tableHead}>Reason</TableCell>
            <TableCell style={styles.tableHead}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {returns.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.pName}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.timestamp}</TableCell>
              <TableCell>{item.rDesc}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleAccept(item.rId, index)}>
                  <AcceptIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(item.rId, index)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Returns;
