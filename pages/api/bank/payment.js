import connectMongo from "@/config/connectMongo";
import Account from "../../../models/account";

export default async function handler(req, res) {
  try {
    await connectMongo();

    console.log("MongoDB connected");

    if (req.method === "POST") {
      const { name, accountNumber, total, cvv, expiryDate } = req.body;
      console.log(name, accountNumber, total, cvv, expiryDate);

      try {
        const account = await Account.findOne({ accountNumber: accountNumber });

        if (account) {
          //check if cvv and expiryDate match

          if (
            account.cvv !== Number(cvv) ||
            account.expiryDate !== expiryDate
          ) {
            res.status(400).send({ message: "Invalid cvv or expiry date" });
          }

          //check if balance is greater than total
          if (account.balance > total) {
            //update balance
            await Account.updateOne(
              { accountNumber: accountNumber },
              { $set: { balance: account.balance - total } }
            );
            res.status(200).send({ message: "Payment successful" });
          } else {
            res.status(400).send({ message: "Insufficient balance" });
          }
        }
      } catch (err) {
        console.error(err);
        res.status(400).send("Account does not exist");
      }
    }
  } catch (error) {
    console.error(error);

    res.status(400).send("An error occurred");
  }
}
