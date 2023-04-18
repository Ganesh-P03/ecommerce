import pool from "../../../../config/mysql";

export default async function handler(req, res) {
  // create the connection pool

  try {
    // get a connection from the pool
    const connection = await pool.getConnection();

    if (req.method === "GET") {
      console.log(req.query.searchName);
      const [rows] = await connection.query(
        `SELECT * FROM products WHERE pName LIKE '%${req.query.searchName}%'`
      );
      connection.release();
      console.log(rows);
      res.status(200).json(rows);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
}
