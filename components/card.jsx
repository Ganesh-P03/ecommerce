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
          <Typography variant="h6" color="primary" component="p">
            ${props.pCost}
          </Typography>
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
