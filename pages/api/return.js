import pool from "../../config/mysql";
import connectMongo from "@/config/connectMongo";
import Account from "../../models/account";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { oId, pId, rDesc, rStatus } = req.body;

    //console.log(oId, pId, rDesc, rStatus);

    //create connection
    const connection = await pool.getConnection();

    //insert into returns table
    const [rows] = await connection.query(
      "INSERT INTO returns (oId, pId, rDesc, rStatus) VALUES (?, ?, ?, ?)",
      [oId, pId, rDesc, rStatus]
    );

    //console.log(rows);

    connection.release();

    res.status(200).json({ message: "Return request created" });
  } else if (req.method === "GET") {
    const { sId } = req.query;

    //create connection
    const connection = await pool.getConnection();

    /*

        also need order time from orders table
        cost from purchase_details table
        product name from products table

        sql query on 4 tables
        1. orders
        2. purchase_details
        3. products
        4. returns

        SELECT * FROM returns JOIN products ON returns.pId = products.pId JOIN orders ON returns.oId = orders.oId JOIN purchase_details ON returns.oId = purchase_details.oId AND returns.pId = purchase_details.pId WHERE products.sId = 1;





    */

    const [returns] = await connection.query(
      "SELECT * FROM returns JOIN products ON returns.pId = products.pId JOIN orders ON returns.oId = orders.oId JOIN purchase_details ON returns.oId = purchase_details.oId AND returns.pId = purchase_details.pId WHERE returns.rStatus='0' AND products.sId = ?",
      [sId]
    );
    //convert time stamp to IST and format it
    for (let item of returns) {
      item.timestamp = new Date(item.timestamp).toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      });
    }

    connection.release();

    res.status(200).json(returns);
  } else if (req.method === "PUT") {
    const { rId, rStatus } = req.body;

    try {
      //create connection
      const connection = await pool.getConnection();

      if (rStatus == 1) {
        const [rows] = await connection.query(
          "SELECT account, price, sId, offerId, pCost FROM returns JOIN products ON returns.pId = products.pId JOIN orders ON returns.oId = orders.oId JOIN purchase_details ON returns.oId = purchase_details.oId AND returns.pId = purchase_details.pId WHERE returns.rId = ?",
          [rId]
        );

        const { account, price, sId, offerId, pCost } = rows[0];

        const amountToBeAddedToCustomer = price;
        const amountToBeDeductedFromSeller = pCost;
        const amountToBeAddedToAdvertiser = pCost - price;

        const customerAccount = account;
        const [query] = await connection.query(
          "SELECT accountNumber FROM wallet WHERE id = ?",
          [sId]
        );
        const sellerAccount = query[0].accountNumber;
        let advertiserAccount = null;

        console.log(customerAccount, sellerAccount, advertiserAccount);
        console.log(
          amountToBeAddedToCustomer,
          amountToBeDeductedFromSeller,
          amountToBeAddedToAdvertiser
        );

        if (offerId) {
          const [query2] = await connection.query(
            "SELECT giverId FROM offers WHERE offerId = ?",
            [offerId]
          );
          const advertiserId = query2[0].giverId;
          const [query3] = await connection.query(
            "SELECT accountNumber FROM wallet WHERE id = ?",
            [advertiserId]
          );
          advertiserAccount = query3[0].accountNumber;
        }

        connection.release();

        //connect to mongo
        await connectMongo();

        //add amount to customer
        await Account.updateOne(
          { accountNumber: customerAccount },
          { $inc: { balance: amountToBeAddedToCustomer } }
        );

        //deduct amount from seller
        await Account.updateOne(
          { accountNumber: sellerAccount },
          { $inc: { balance: -amountToBeDeductedFromSeller } }
        );

        //add amount to advertiser
        if (advertiserAccount) {
          await Account.updateOne(
            { accountNumber: advertiserAccount },
            { $inc: { balance: amountToBeAddedToAdvertiser } }
          );
        }
      }

      //update returns table
      const [rows] = await connection.query(
        "UPDATE returns SET rStatus = ? WHERE rId = ?",
        [rStatus, rId]
      );

      //console.log(rows);

      connection.release();

      res.status(200).json({ message: "Return request updated" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
