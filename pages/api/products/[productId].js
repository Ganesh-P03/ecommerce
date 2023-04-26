import mysql from "mysql2/promise";

export default async function handler(req, res) {
  // create the connection pool
  const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    connectionLimit: 50,
  });

  try {
    //if req is get then get the product of that sId

    //http://localhost:3000/api/products/{sId}
    if (req.method === "GET") {
      const connection = await pool.getConnection();
      const [rows] = await connection.query(
        "SELECT * FROM products WHERE sId = ?",
        [req.query.productId]
      );
      connection.release();
      res.status(200).json(rows);
    }

    //http://localhost:3000/api/products/{sId}
    if (req.method === "POST") {
      const connection = await pool.getConnection();
      //console.log(req.query);
      //console.log(req);
      const { pName, pDesc, pImg, pCost, pQty } = req.body;
      console.log(pName, pDesc, pImg, pCost, pQty);
      const sId = req.query.productId;
      const [rows] = await connection.query(
        `INSERT INTO products (pName, pDesc, pImg, pCost, pQty, sId)
              VALUES (?, ?, ?, ?, ?, ?)
              `,
        [pName, pDesc, pImg, pCost, pQty, sId]
      );
      connection.release();
      res.status(201).json({ message: "Product created" });
    }

    //if req is put then update the product based on pId
    //http://localhost:3000/api/products/{pId}
    if (req.method === "PUT") {
      const connection = await pool.getConnection();
      const { pQty } = req.body;

      const [rows] = await connection.query(
        "UPDATE products SET pQty = ? WHERE pId = ?",
        [pQty, req.query.productId]
      );
      connection.release();
      res.status(200).json(rows);
    }

    //if req is delete then delete the product based on pId
    //http://localhost:3000/api/products/{pId}
    if (req.method === "DELETE") {
      const connection = await pool.getConnection();
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
