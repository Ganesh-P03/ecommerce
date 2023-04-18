import Layout from "@/components/layout";
import { useSession } from "next-auth/react";
import CardComponent from "@/components/card";
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
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";

export default function Index() {
  const [products, setProducts] = useState([]);
  const { status, data } = useSession();

  const router = useRouter();

  const getProducts = useCallback(async () => {
    try {
      if (router.query.pName) {
        const response = await axios.get(
          `/api/products/search/${router.query.pName}`
        );
        setProducts(response.data);
        return;
      } else {
        const response = await axios.get("/api/products/products");
        setProducts(response.data);
        return;
      }
    } catch (err) {
      console.log(err);
    }
  }, [router.query.pName]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <Layout>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.pId}>
            <CardComponent
              pId={product.pId}
              pName={product.pName}
              pDesc={product.pDesc}
              pCost={product.pCost}
              pImg={product.pImg}
              pQty={product.pQty}
              id={status === "authenticated" ? data.token.id : -1}
            />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}
