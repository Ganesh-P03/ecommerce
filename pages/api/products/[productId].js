import mysql from "mysql2/promise";

export default async function handler(req, res) {
  // create the connection pool
  const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    connectionLimit: 10,
  });

  try {
    const connection = await pool.getConnection();
    //if req is get then get the product of that sId
    if (req.method === "GET") {
      const [rows] = await connection.query(
        "SELECT * FROM products WHERE sId = ?",
        [req.query.productId]
      );
      connection.release();
      res.status(200).json(rows);
    }

    //if req is put then update the product based on pId
    if (req.method === "PUT") {
      const { pName, pDesc, pImg, pCost, pQty, sId } = req.body;
      const [rows] = await connection.query(
        "UPDATE products SET pName = ?, pDesc = ?, pImg = ?, pCost = ?, pQty = ?, sId = ? WHERE pId = ?",
        [pName, pDesc, pImg, pCost, pQty, sId, req.query.productId]
      );
      connection.release();
      res.status(200).json(rows);
    }

    //if req is delete then delete the product based on pId
    if (req.method === "DELETE") {
      const [rows] = await connection.query(
        "DELETE FROM products WHERE pId = ?",
        [req.query.productId]
      );
      connection.release();
      res.status(200).json(rows);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
}
