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

    // execute a query
    const [rows] = await connection.query("SELECT * FROM products");

    // release the connection back to the pool
    connection.release();

    // send the results back to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
}
