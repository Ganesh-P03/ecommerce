import {
  Container,
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import axios from "axios";

const addTocart = async (pId, id) => {
  try {
    if (id === -1) {
      alert("Please Login to add to cart");
      return;
    }

    const response = await axios.post(`/api/cart/${id}`, {
      pId: pId,
      quantity: 1,
    });
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

const CardComponent = (props) => {
  return (
    <Card sx={{ maxWidth: 345, margin: "10px", maxHeight: 500, boxShadow: 3 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={props.pName}
          height="140"
          image={props.pImg}
          title={props.pName}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.pName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.pDesc}
          </Typography>
          {console.log(props.offers)}

          {props.offers != null ? (
            <Typography variant="body2" color="text.secondary" component="div">
              <Typography
                variant="body2"
                color="text.secondary"
                component="div"
              >
                <strike>₹{props.pCost}</strike>
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                component="div"
              >
                ₹{props.pCost - (props.pCost * props.offers.discount) / 100}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                component="div"
              >
                <b>
                  {props.offers.discount}% off on {props.offers.offerName}
                </b>
              </Typography>

              {/*badges with start and end date*/}

              <Typography
                variant="body2"
                color="text.secondary"
                component="div"
              >
                <b>Start Date: {props.offers.startDate}</b>
                <br />
                <b>End Date: {props.offers.endDate}</b>
              </Typography>
            </Typography>
          ) : (
            <Typography variant="body2" color="text.secondary" component="div">
              ₹{props.pCost}
            </Typography>
          )}
        </CardContent>

        {props.pQty > 0 ? (
          <Button
            onClick={(e) => {
              addTocart(props.pId, props.id);
            }}
          >
            <Typography variant="h6" color="primary" component="p">
              Add to Cart
            </Typography>
          </Button>
        ) : (
          <Typography variant="h6" color="error" component="p">
            Out of Stock
          </Typography>
        )}
      </CardActionArea>
    </Card>
  );
};

export default CardComponent;
