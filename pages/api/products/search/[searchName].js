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

      //also get offers
      for (let item of rows) {
        const [offers] = await connection.query(
          "SELECT * FROM offers WHERE pId = ? AND startDate <= CURDATE() AND endDate >= CURDATE()",
          [item.pId]
        );

        //convert startDate and endDate to loacal date string
        for (let offer of offers) {
          offer.startDate = offer.startDate.toLocaleDateString();
          offer.endDate = offer.endDate.toLocaleDateString();
        }

        item.offers = offers;
      }

      connection.release();
      //console.log(rows);
      res.status(200).json(rows);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
}
