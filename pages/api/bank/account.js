import connectMongo from "@/config/connectMongo";
import Account from "../../../models/account";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await connectMongo();
    const { name, accountNumber, balance, cvv, expiryDate } = req.body;

    // const bal = Number(balance);

    //add account to database
    const account = new Account({
      name,
      accountNumber,
      balance,
      cvv,
      expiryDate,
    });
    console.log(account);

    await account.save();

    res.status(200).json({ message: "Account created successfully" });
  } else if (req.method === "GET") {
    //find account by accountNumber
    // const account = await Account.findOne({
    //   accountNumber: req.query.accountNumber,
    // });
    // if (account) {
    //   res.status(200).json(account);
    // } else {
    //   res.status(400).json({ message: "Account does not exist" });
    // }

    //find all accounts

    const accounts = await Account.find();
    if (accounts) {
      res.status(200).json(accounts);
    } else {
      res.status(400).json({ message: "No accounts found" });
    }
  }
}
