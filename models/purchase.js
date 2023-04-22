import { Schema, model, models } from "mongoose";

const purchaseSchema = new Schema({
  oId: {
    type: String,
    required: true,
    unique: true,
  },
  cId: {
    type: String,
    required: true,
  },
  items: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
      },
      desc: {
        type: String,
      },
    },
  ],
});
