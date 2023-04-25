import pool from "../../../config/mysql";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const connection = await pool.getConnection();

    /*
      tables
      cart
      products
      offers

      calculate new thing name netPrice = price - discount

      SELECT * FROM cart WHERE cId = 1

      SELECT * FROM cart JOIN products ON cart.pId = products.pId WHERE cId = 1

      SELECT * FROM cart JOIN products ON cart.pId = products.pId JOIN offers ON cart.pId = offers.pId WHERE cId = 1 AND offers.startDate <= CURDATE() AND offers.endDate >= CURDATE()

      Dont loose any data from cart table if offer is not applicable

      SELECT * FROM cart JOIN products ON cart.pId = products.pId LEFT JOIN offers ON cart.pId = offers.pId WHERE cId = 1 AND offers.startDate <= CURDATE() AND offers.endDate >= CURDATE()

      some products may not have offers, so we need to use left join


      if offer is not applicable, then where will be null in the offer columns
      so we need to check if offer is null or not

      select * from cart join products on cart.pId = products.pId left join offers on cart.pId = offers.pId where cId = 1 and (offers.startDate <= CURDATE() and offers.endDate >= CURDATE() or offers.startDate is null)

    */

    const [rows] = await connection.query(
      "SELECT * FROM cart JOIN products ON cart.pId = products.pId LEFT JOIN offers ON cart.pId = offers.pId WHERE cId = ? AND (offers.startDate <= CURDATE() AND offers.endDate >= CURDATE() OR offers.startDate IS NULL)",
      [req.query.cart]
    );

    //calculate netPrice
    for (let item of rows) {
      if (item.discount === null) {
        item.netPrice = item.pCost;
      } else {
        item.netPrice = item.pCost * (1 - item.discount / 100);
      }
    }

    connection.release();
    res.status(200).json(rows);
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

/*

const [rows] = await connection.query("SELECT * FROM cart WHERE cId = ?", [
      req.query.cart,
    ]);

    let response = [];

    for (let row of rows) {
      const [product] = await connection.query(
        "SELECT * FROM products WHERE pId = ?",
        [row.pId]
      );

      product[0].quantity = row.quantity;

      response.push(product[0]);
    }

*/
