import pool from "../../config/mysql";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const connection = await pool.getConnection();

    const { cId, items } = req.body;

    try {
      const [oId] = await connection.query(
        "select count(distinct oId) as oId from purchase where cId = ?",
        [cId]
      );

      console.log(oId[0].oId + 1);
      console.log(items);

      //insert into purchase_items table
      for (let item of items) {
        await connection.query(
          "INSERT INTO purchase(oId, cId, pId, quantity, price) VALUES(?, ?, ?, ?, ?)",
          [oId[0].oId + 1, cId, item.pId, item.quantity, Number(item.pCost)]
        );
      }
    } catch (err) {
      console.log(err);
    }

    connection.release();

    res.status(200).json({ message: "Order placed successfully" });
  } else if (req.method === "GET") {
    const connection = await pool.getConnection();

    /*
    SELECT p.oId,p.pId,products.pName,products.pDesc,products.pImg,p.price,p.quantity FROM purchase as p
    JOIN products ON purchase.pId = products.pId
    WHERE cId = 1
    ORDER BY oId DESC

    response = [
      {
        oId: 1,
        cId: 1,
        items: [
          {
            pId: 1,
            name: "Product 1",
            price: 100,
            quantity: 1,
            image: "image1.jpg",
            desc: "Product 1 description",
          },
        ]
      }
    */

    try {
      const [rows] = await connection.query(
        "SELECT p.oId,p.pId,products.pName,products.pDesc,products.pImg,p.price,p.quantity FROM purchase as p JOIN products ON p.pId = products.pId WHERE cId = ? ORDER BY oId DESC",
        [req.query.cId]
      );

      connection.release();

      const response = [];

      for (let row of rows) {
        const index = response.findIndex((item) => item.oId === row.oId);

        if (index === -1) {
          response.push({
            oId: row.oId,
            items: [
              {
                pId: row.pId,
                name: row.pName,
                price: row.price,
                quantity: row.quantity,
                image: row.pImg,
                desc: row.pDesc,
              },
            ],
          });
        } else {
          response[index].items.push({
            pId: row.pId,
            name: row.pName,
            price: row.price,
            quantity: row.quantity,
            image: row.pImg,
            desc: row.pDesc,
          });
        }
      }

      res.status(200).json(response);
    } catch {
      console.log(err);
    }
    connection.release();
    res.status(400).send("An error occurred");
  }
}
