import connectMongo from "@/config/connectMongo";
import Account from "../../../models/account";
import pool from "../../../config/mysql";

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
    const id = req.query.id;
    const connection = await pool.getConnection();

    //get account number of that id from wallet table
    const [rows] = await connection.query(
      "SELECT accountNumber FROM wallet WHERE id = ?",
      [id]
    );

    connection.release();

    await connectMongo();

    //get account details from account table
    const account = await Account.findOne({
      accountNumber: rows[0].accountNumber,
    });

    res.status(200).json(account);
  }
}
