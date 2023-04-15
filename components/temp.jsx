import { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  makeStyles,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "./Layout";

const styles = {
  list: {
    backgroundColor: "#fff",
    marginTop: "16px",
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    margin: "8px",
  },
};

const Temp = (props) => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState("");
  const [editing, setEditing] = useState(false);
  const [editProduct, setEditProduct] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`/api/products/${props.id}`);
      setProducts(result.data);
    };
    fetchData();
  }, [props.id]);

  const handleAddProduct = async () => {
    await axios.post("/api/products", { name: newProduct });
    setNewProduct("");
    const result = await axios.get("/api/products");
    setProducts(result.data);
  };

  const handleDeleteProduct = async (id) => {
    await axios.delete(`/api/products/${id}`);
    const result = await axios.get("/api/products");
    setProducts(result.data);
  };

  const handleEditProduct = async () => {
    await axios.put(`/api/products/${editing}`, { name: editProduct });
    setEditing(false);
    setEditProduct("");
    const result = await axios.get("/api/products");
    setProducts(result.data);
  };

  return (
    <Layout>
      <div style={{ margin: "16px", padding: "16px" }}>
        <Typography variant="h4" gutterBottom>
          Manage Products
        </Typography>
        <TextField
          label="New Product Name"
          value={newProduct}
          onChange={(e) => setNewProduct(e.target.value)}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          style={styles.button}
          onClick={handleAddProduct}
          startIcon={<AddIcon />}
        >
          Add Product
        </Button>
        <List style={styles.list}>
          {products.map((product) => (
            <ListItem key={product.pId} style={styles.listItem}>
              {editing === product.pId ? (
                <TextField
                  label="Edit Product Name"
                  value={editProduct}
                  onChange={(e) => setEditProduct(e.target.value)}
                  margin="normal"
                />
              ) : (
                <ListItemText primary={product.pName} />
              )}
              <ListItemSecondaryAction>
                {editing === product.pId ? (
                  <IconButton
                    edge="end"
                    aria-label="Save"
                    onClick={handleEditProduct}
                  >
                    <SaveIcon />
                  </IconButton>
                ) : (
                  <>
                    <IconButton
                      edge="end"
                      aria-label="Edit"
                      onClick={() => {
                        setEditing(product.pId);
                        setEditProduct(product.pName);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="Delete"
                      onClick={() => handleDeleteProduct(product.pId)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    </Layout>
  );
};

export default Temp;
