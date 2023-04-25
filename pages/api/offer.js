import pool from "../../config/mysql";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { pId, offerName, offerDesc, discount, startDate, endDate, giverId } =
      req.body;

    const connection = await pool.getConnection();

    //convert startDate and endDate string to Date object
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    //CHECK IF OFFER ALREADY EXISTS
    const [rows] = await connection.query(
      "SELECT * FROM offers WHERE pId = ?",
      [pId]
    );

    if (rows.length > 0) {
      //update offer
      const [updatedRows] = await connection.query(
        "UPDATE offers SET offerName = ?, offerDesc = ?, discount = ?, startDate = ?, endDate = ?, giverId = ? WHERE pId = ?",
        [offerName, offerDesc, discount, startDateObj, endDateObj, giverId, pId]
      );
    } else {
      //add offer
      const [updatedRows] = await connection.query(
        "INSERT INTO offers (pId,offerName,offerDesc,discount,startDate,endDate,giverId) VALUES (?,?,?,?,?,?,?)",
        [pId, offerName, offerDesc, discount, startDateObj, endDateObj, giverId]
      );
    }

    connection.release();
    res.status(200).json({ message: "success" });
  }
}
