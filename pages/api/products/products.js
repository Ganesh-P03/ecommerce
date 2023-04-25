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
    // get a connection from the pool
    const connection = await pool.getConnection();

    if (req.method === "GET") {
      const [rows] = await connection.query("SELECT * FROM products");

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
    connection.release();
    res.status(500).send("An error occurred");
  }
}
