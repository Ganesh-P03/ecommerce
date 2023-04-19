import Layout from "@/components/layout";
import { useSession } from "next-auth/react";
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import DeleteIcon from "@mui/icons-material/Delete";
import { Typography, Button, Grid, Paper } from "@mui/material";

import axios from "axios";

const Cart = () => {
  const { status, data } = useSession();
  const router = useRouter();

  const [cartItems, setcartItems] = useState([]);

  const getCartItems = useCallback(async () => {
    try {
      if (status === "authenticated" && data.token.role === "buyer") {
        const response = await axios.get(`/api/cart/${data.token.id}`);
        setcartItems(response.data);
        return;
      }
    } catch (err) {
      console.log(err);
    }
  }, [status, data]);

  useEffect(() => {
    getCartItems();
  }, [getCartItems]);

  //   const handleDeleteItem = (id) => {
  //     const updatedCartItems = cartItems.filter((item) => item.id !== id);
  //     setCartItems(updatedCartItems);
  //   };

  //   const getTotalPrice = () => {
  //     const total = cartItems.reduce((acc, item) => {
  //       return acc + item.price * item.qty;
  //     }, 0);
  //     return total;
  //   };

  const styles = {
    root: {
      flexGrow: 1,
      margin: "auto",
      padding: "16px",
      maxWidth: 1000,
    },
    title: {
      marginBottom: "16px",
    },
    item: {
      display: "flex",
      alignItems: "center",
      padding: "16px",
    },
    itemImg: {
      width: 100,
      height: 100,
      marginRight: "16px",
    },
    itemInfo: {
      flexGrow: 1,
    },
    itemName: {
      fontWeight: "bold",
    },
    itemPrice: {
      marginTop: "8px",
    },
    itemQty: {
      margin: "16px",
    },
    itemTotal: {
      fontWeight: "bold",
      marginRight: "16px",
    },
    deleteBtn: {
      marginLeft: "16px",
    },
    checkoutBtn: {
      marginTop: "16px",
    },
    total: {
      marginTop: "16px",
    },
    totalText: {
      marginTop: "16px",
    },
  };

  return (
    <Layout>
      <div style={styles.root}>
        <Typography variant="h4" style={styles.title}>
          Cart
        </Typography>
        <Grid container spacing={3}>
          {cartItems.map((item) => (
            <Grid item xs={12} key={item.pId}>
              <Paper style={styles.item}>
                <img src={item.pImg} alt={item.pName} style={styles.itemImg} />
                <div style={styles.itemInfo}>
                  <Typography variant="h6" style={styles.itemName}>
                    {item.pName}
                  </Typography>
                  <Typography variant="body2" style={styles.itemPrice}>
                    ${item.pCost}
                  </Typography>
                  <div style={styles.itemQty}>
                    <Typography variant="body2">
                      Quantity: {item.quantity}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                      startIcon={<DeleteIcon />}
                      style={styles.deleteBtn}
                      //onClick={() => handleDeleteItem(item.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
                <Typography variant="body2" style={styles.itemTotal}>
                  ${item.pCost * item.quantity}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/*getTotalPrice()*/}
        <div style={styles.total}>
          <Typography variant="h5" style={styles.totalText}>
            Total:
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={styles.checkoutBtn}
            onClick={() => {
              router.push("/checkout");
            }}
          >
            Checkout
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
