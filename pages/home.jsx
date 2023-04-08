import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";
import axios from "axios";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    }
    fetchData();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Welcome to our Ecommerce Store
      </Typography>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.pId}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt={product.pName}
                  height="140"
                  image={product.pImg}
                  title={product.pName}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {product.pName}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {product.pDesc}
                  </Typography>
                  <Typography variant="h6" color="primary" component="p">
                    ${product.pCost}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
