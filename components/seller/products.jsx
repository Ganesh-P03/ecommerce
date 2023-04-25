import React from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState, useEffect } from "react";

//show all the products owned by the seller logged in
const Products = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`/api/products/${props.id}`);
      setProducts(result.data);
    };
    fetchData();
  }, [props.id]);

  //   const getData = async () => {
  //     const result = await axios.get(`/api/products/${props.id}`);
  //     setProducts(result.data);
  //   };

  const handleDeleteProduct = async (pId) => {
    console.log(pId);
    const result = await axios.delete(`/api/products/${pId}`);

    //remove the deleted product from the list
    const newProducts = products.filter((product) => product.pId != pId);
    setProducts(newProducts);
    //setProducts(result.data);
  };

  const handleEditProduct = async (pId) => {
    console.log(pId);

    try {
      let newQty = prompt("Enter new quantity");
      const result = await axios.put(`/api/products/${pId}`, {
        pQty: newQty,
      });

      //update the quantity of the product in the list
      const newProducts = products.map((product) => {
        if (product.pId == pId) {
          product.pQty = newQty;
        }
        return product;
      });
      setProducts(newProducts);
    } catch (e) {
      console.log(e);
    }
  };

  const renderBody = () => {
    return (
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.pId}>
            <TableCell component="th" scope="row">
              {product.pName}
            </TableCell>
            <TableCell align="right">{product.pCost}</TableCell>
            <TableCell align="right">{product.quantity}</TableCell>
            <TableCell align="right">{product.pDesc}</TableCell>
            <TableCell align="right">{product.pQty}</TableCell>

            <TableCell align="right">
              <Button
                variant="contained"
                color="primary"
                value={product.pId}
                onClick={(e) => handleEditProduct(e.target.value)}
                startIcon={<EditIcon />}
              >
                Edit
              </Button>
            </TableCell>
            <TableCell align="right">
              <Button
                variant="contained"
                color="primary"
                value={product.pId}
                onClick={(e) => handleDeleteProduct(e.target.value)}
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  };

  // const handleGettingData = async () => {
  //   const result = await axios.get(`/api/products/${props.id}`);
  //   setProducts(result.data);
  // };

  return (
    <>
      {/* <button
        onClick={() => {
          handleGettingData();
        }}
      >
        getData
      </button> */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell align="right">Cost</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          {renderBody()}
        </Table>
      </TableContainer>
    </>
  );
};

export default Products;
