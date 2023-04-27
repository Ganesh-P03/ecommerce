use ecommerce;

create table offers(
    offerId INT(11) NOT NULL AUTO_INCREMENT,
    pId    INT(11) NOT NULL,
    offerName VARCHAR(50) NOT NULL,
    offerDesc TEXT NOT NULL,
    discount DECIMAL(10,2) NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    giverId INT(11) NOT NULL,
    PRIMARY KEY (offerId)
);


INSERT INTO offers (pId,offerName,offerDesc,discount,startDate,endDate,giverId) VALUES
(6,'Early Bird',"Flat 10% offer on new Apple watch",10,'2023-04-01','2023-08-31',13);


 console.log(cId, items, account);

      const connection = await pool.getConnection();

      const [rows] = await connection.query(
        `INSERT INTO orders (cID,account) VALUES (?,?)`,
        [cId, account]
      );

      const orderId = rows.insertId;

      items.forEach(async (item) => {
        const [rows] = await connection.query(
          `INSERT INTO purchase_details (oId,pId,quanity,offerId,price) VALUES (?,?,?,?,?)`,
          [orderId, item.pId, item.quanity, item.offerId, item.price]
        );
      });

      res.status(201).json({ message: "Order created" });