import { Schema, model, models } from "mongoose";

const accountSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
    unique: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  cvv: {
    type: Number,
    required: true,
  },
  expiryDate: {
    type: String,
    required: true,
  },
});

const Account = models.Account || model("Account", accountSchema);
export default Account;
