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
    // get a connection from the pool
    const connection = await pool.getConnection();

    if (req.method === "POST") {
      const { pName, pDesc, pImg, pCost, pQty, sId } = req.body;
      const [rows] = await connection.query(
        `INSERT INTO products (pName, pDesc, pImg, pCost, pQty, sId)
              VALUES (?, ?, ?, ?, ?, ?)
              `,
        [pName, pDesc, pImg, pCost, pQty, sId]
      );
      connection.release();
      res.status(201).json({ message: "Product created" });
    }

    if (req.method === "GET") {
      const [rows] = await connection.query("SELECT * FROM products");
      connection.release();
      res.status(200).json(rows);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
}
