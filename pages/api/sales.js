import pool from "../../config/mysql";

export default async function handler(req, res) {
  if (req.method == "GET") {
    const sId = req.query.sId;

    const connection = await pool.getConnection();

    try {
      const [sales] = await connection.query(
        "select purchase_details.pId,sum(quantity) as totalQuantity,products.pName,sum(quantity)*products.pCost as revenue from purchase_details join products on purchase_details.pId = products.pId where sId = ? group by purchase_details.pId order by totalQuantity desc",
        [sId]
      );

      connection.release();

      res.status(200).json(sales);
    } catch (err) {
      console.log(err);

      connection.release();

      res.status(500).json({ message: "Server Error" });
    }
  }
}
