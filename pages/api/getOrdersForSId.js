import pool from "../../config/mysql";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const sId = req.query.sId;
      const connection = await pool.getConnection();

      const [orders] = await connection.query(
        "SELECT orders.oId,timestamp,quantity,pName,account FROM orders JOIN purchase_details ON orders.oId = purchase_details.oId JOIN products ON purchase_details.pId = products.pId WHERE products.sId = ? ORDER BY orders.oId DESC",
        [sId]
      );

      //convert timestamp to date
      orders.forEach((order) => {
        order.timestamp = new Date(order.timestamp).toDateString();
      });

      connection.release();

      res.status(200).json(orders);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server Error" });
    }
  }
}
