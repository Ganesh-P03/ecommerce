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
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

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

const AddProduct = (props) => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [items, setItems] = useState([]);
  const [wNames, setWNames] = useState([]);

  // const getWarehouseName = useCallback(async (id) => {
  //   const result = await axios.get(`/api/warehouses`);
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(
      productName,
      productDescription,
      productPrice,
      productImage,
      items
    );

    try {
      await axios.post(`/api/products/${props.id}`, {
        pName: productName,
        pDesc: productDescription,
        pImg: productImage,
        pCost: productPrice,
        pQty: itemQuantity,
      });

      //refresh the page
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Add Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <div style={styles.formContainer}>
          <div style={styles.inputContainer}>
            <TextField
              fullWidth
              label="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <TextField
              fullWidth
              label="Product Description"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            />
            <TextField
              fullWidth
              label="Product Price"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />
            <TextField
              fullWidth
              label="Product Image URL"
              value={productImage}
              onChange={(e) => setProductImage(e.target.value)}
            />
          </div>
          <div>
            <img src={productImage} alt="Product" height="200" />
          </div>
        </div>

        <Typography variant="h5" component="h2" gutterBottom>
          Items
        </Typography>
        <div style={{ display: "flex", alignItems: "center" }}>
          <TextField
            label="Item Quantity"
            value={itemQuantity}
            onChange={(e) => setItemQuantity(e.target.value)}
          />
          <TextField
            label="Warehouse"
            value={warehouse}
            onChange={(e) => setWarehouse(e.target.value)}
          />
        </div>

        <Grid container justify="flex-end">
          <Grid item>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddProduct;
