import mysql from "mysql2/promise";
import { hash } from "bcryptjs";

export default async function handler(req, res) {
  const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    connectionLimit: 10,
  });

  try {
    const { name, email, password, mobile, role } = req.body;
    const connection = pool.getConnection();

    // const [rows] = await connection.query(
    //   "SELECT * FROM users WHERE email = ?",
    //   [email]
    // );

    // connection.release();

    // if (rows.length > 0) {
    //   res.status(400).json({ message: "User already exists" });
    // } else {
    //   const hashedPassword = await hash(password, 10);

    //   const connection = await pool.getConnection();

    //   // const results = await connection.query(
    //   //   `INSERT INTO users (name, email, password, mobile, role)
    //   //       VALUES (?, ?, ?, ?, ?)
    //   //       `,
    //   //   [name, email, hashedPassword, mobile, role]
    //   // );

    //   connection.release();

    res.status(201).json({ message: "User created" });
    //}
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
}
