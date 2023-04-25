import pool from "../../config/mysql";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const connection = await pool.getConnection();

    const [rows] = await connection.query(
      "SELECT * FROM orders where oId = ?",
      [req.query.id]
    );

    connection.release();

    res.status(200).json(rows);
  }
}
