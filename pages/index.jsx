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

  const AdvertiseComponent = () => {
    return (
      <>
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.pId}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={product.pImg}
                    alt={product.pName}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.pName}
                    </Typography>

                    {product.offers && product.offers.length > 0 ? (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        component="div"
                      >
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          component="div"
                        >
                          <strike>₹{product.pCost}</strike>
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          component="div"
                        >
                          <b>
                            ₹
                            {product.pCost -
                              (product.pCost * product.offers[0].discount) /
                                100}
                          </b>
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          component="div"
                        >
                          <b>
                            {product.offers[0].discount}% off on{" "}
                            {product.offers[0].offerName}
                          </b>
                        </Typography>
                      </Typography>
                    ) : (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        component="div"
                      >
                        <b>₹{product.pCost}</b>
                      </Typography>
                    )}
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </>
    );
  };

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
              offers={
                product.offers && product.offers.length > 0
                  ? product.offers[0]
                  : null
              }
              id={status === "authenticated" ? data.token.id : -1}
            />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}

/*small cards displaying the advertisements*/
{
  /* <>
<Card sx={{ maxWidth: 345 }}>
  <Typography variant="body2" color="text.secondary">
    {offer.offerName}
  </Typography>
  <Typography variant="body2" color="text.secondary">
    {offer.offerDesc}
  </Typography>
  <Typography variant="body2" color="text.secondary">
    {offer.discount}
  </Typography>
  <Typography variant="body2" color="text.secondary">
    {offer.startDate}
  </Typography>
  <Typography variant="body2" color="text.secondary">
    {offer.endDate}
  </Typography>
</Card>
</> */
}
