import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";
import { useSession } from "next-auth/react";

// const products = [
//   {
//     name: "Product 1",
//     desc: "A nice thing",
//     price: "$9.99",
//   },
//   {
//     name: "Product 2",
//     desc: "Another thing",
//     price: "$3.45",
//   },
//   {
//     name: "Product 3",
//     desc: "Something else",
//     price: "$6.51",
//   },
//   {
//     name: "Product 4",
//     desc: "Best thing of all",
//     price: "$14.11",
//   },
//   { name: "Shipping", desc: "", price: "Free" },
// ];

export default function Review(props) {
  const [products, setProducts] = React.useState([]);

  const getProducts = React.useCallback(async () => {
    const response = await axios.get(
      `http://localhost:3000/api/cart/${props.id}`
    );

    setProducts(response.data);
  }, [props.id]);

  React.useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>

      <List disablePadding>
        {products.length === 0 && (
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="No items in cart" />
          </ListItem>
        )}

        {products.length !== 0 && (
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Product" sx={{ flex: 1 }} />
            <Typography variant="body2" sx={{ flex: 1 }}>
              Price
            </Typography>
            <ListItemText primary="Quantity" sx={{ flex: 1 }} />
            <Typography variant="body2">Total</Typography>
          </ListItem>
        )}
        {products.map((product) => (
          <ListItem key={product.pId} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.pName} sx={{ flex: 1 }} />
            <Typography variant="body2" sx={{ flex: 1 }}>
              {product.pCost}
            </Typography>
            <ListItemText primary={product.quantity} sx={{ flex: 1 }} />
            <Typography variant="body2">
              {product.pCost * product.quantity}
            </Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {products.reduce((acc, curr) => {
              return acc + curr.pCost * curr.quantity;
            }, 0)}
          </Typography>
        </ListItem>
      </List>
    </React.Fragment>
  );
}
