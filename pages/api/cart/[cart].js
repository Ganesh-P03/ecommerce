import pool from "../../../config/mysql";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM cart WHERE cId = ?", [
      req.query.cart,
    ]);
    //get product details from products table using pId

    /*


    */

    let response = [];

    for (let row of rows) {
      const [product] = await connection.query(
        "SELECT * FROM products WHERE pId = ?",
        [row.pId]
      );

      product[0].quantity = row.quantity;

      response.push(product[0]);
    }

    connection.release();
    res.status(200).json(response);
  } else if (req.method === "POST") {
    const connection = await pool.getConnection();

    //check if product already exists in cart
    const [rows] = await connection.query(
      "SELECT * FROM cart WHERE cId = ? AND pId = ?",
      [req.query.cart, req.body.pId]
    );

    let updatedRows;

    if (rows.length > 0) {
      //update quantity
      [updatedRows] = await connection.query(
        "UPDATE cart SET quantity = ? WHERE cId = ? AND pId = ?",
        [req.body.quantity + rows[0].quantity, req.query.cart, req.body.pId]
      );
    } else {
      //add product to cart
      [updatedRows] = await connection.query(
        "INSERT INTO cart (cId, pId, quantity) VALUES (?, ?, ?)",
        [req.query.cart, req.body.pId, req.body.quantity]
      );
    }

    connection.release();
    res.status(200).json(updatedRows);
  } else if (req.method === "PUT") {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "UPDATE cart SET quantity = ? WHERE cId = ? AND pId = ?",
      [req.body.quantity, req.query.cart, req.body.pId]
    );
    connection.release();
    res.status(200).json(rows);
  } else if (req.method === "DELETE") {
    const connection = await pool.getConnection();

    if (req.body.pId === undefined) {
      const [rows] = await connection.query("DELETE FROM cart WHERE cId = ?", [
        req.query.cart,
      ]);

      connection.release();
      res.status(200).json(rows);
      return;
    }

    const [rows] = await connection.query(
      "DELETE FROM cart WHERE cId = ? AND pId = ?",
      [req.query.cart, req.body.pId]
    );

    connection.release();
    res.status(200).json(rows);
  }
}
