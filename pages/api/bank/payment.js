import connectMongo from "@/config/connectMongo";
import Account from "../../../models/account";

export default async function handler(req, res) {
  try {
    await connectMongo();

    console.log("MongoDB connected");

    if (req.method === "POST") {
      const { name, accountNumber, total, cvv, expiryDate } = req.body;

      //find account by accountNumber
      Account.find({ accountNumber: accountNumber }, (err, account) => {
        if (err) {
          console.error(err);
          res.status(400).send("Account does not exist");
        } else {
          if (account) {
            //check if cvv and expiryDate match
            if (account.cvv !== cvv || account.expiryDate !== expiryDate) {
              res.status(400).json({ message: "Invalid cvv or expiry date" });
            }

            //check if balance is greater than total
            if (account.balance > total) {
              //update balance
              Account.updateOne(
                { accountNumber: accountNumber },
                { $set: { balance: account.balance - total } },
                (err, result) => {
                  if (err) {
                    console.error(err);
                    res.status(400).send("An error occurred");
                  } else {
                    res.status(200).json({ message: "Payment successful" });
                  }
                }
              );
            } else {
              res.status(400).json({ message: "Insufficient balance" });
            }
          } else {
            res.status(400).json({ message: "Account does not exist" });
          }
        }
      });
    }
  } catch (error) {
    console.error(error);

    res.status(400).send("An error occurred");
  }
}
