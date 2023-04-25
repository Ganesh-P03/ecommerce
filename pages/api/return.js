import pool from "../../config/mysql";

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

    //create connection
    const connection = await pool.getConnection();

    //update returns table
    const [rows] = await connection.query(
      "UPDATE returns SET rStatus = ? WHERE rId = ?",
      [rStatus, rId]
    );

    //console.log(rows);

    connection.release();

    res.status(200).json({ message: "Return request updated" });
  }
}
