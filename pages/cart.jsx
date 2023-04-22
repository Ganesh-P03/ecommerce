import Layout from "@/components/layout";
import { useSession } from "next-auth/react";
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import DeleteIcon from "@mui/icons-material/Delete";
import { Typography, Button, Grid, Paper } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

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

  const handleDeleteItem = async (id) => {
    // const updatedCartItems = cartItems.filter((item) => item.id === id);
    // setcartItems(updatedCartItems);
    console.log(id);
    try {
      await axios.delete(`/api/cart/${data.token.id}`, {
        data: {
          pId: id,
        },
      });

      setcartItems((prev) => prev.filter((item) => item.pId !== id));
    } catch (err) {
      alert(`Try again later ${err}`);
    }
  };

  const getTotalPrice = () => {
    const total = cartItems.reduce((acc, item) => {
      return acc + item.pCost * item.quantity;
    }, 0);
    return total;
  };

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
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      startIcon={<RemoveCircleIcon />}
                      disabled={item.quantity === 1}
                      onClick={() => {
                        axios.put(`/api/cart/${data.token.id}`, {
                          pId: item.pId,
                          quantity: item.quantity - 1,
                        });
                        setcartItems((prev) =>
                          prev.map((old) =>
                            old.pId === item.pId
                              ? { ...old, quantity: old.quantity - 1 }
                              : old
                          )
                        );
                      }}
                    >
                      -
                    </Button>
                    <Typography variant="body2">
                      Quantity: {item.quantity}
                    </Typography>

                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      startIcon={<AddCircleIcon />}
                      disabled={item.quantity === item.pQty}
                      onClick={() => {
                        axios.put(`/api/cart/${data.token.id}`, {
                          pId: item.pId,
                          quantity: item.quantity + 1,
                        });
                        //increase quantity of that item in cart
                        setcartItems((prev) =>
                          prev.map((old) =>
                            old.pId === item.pId
                              ? { ...old, quantity: old.quantity + 1 }
                              : old
                          )
                        );
                      }}
                    >
                      +
                    </Button>

                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                      startIcon={<DeleteIcon />}
                      style={styles.deleteBtn}
                      onClick={() => handleDeleteItem(item.pId)}
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

        <div style={styles.total}>
          <Typography variant="h5" style={styles.totalText}>
            Total:{getTotalPrice()}
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
