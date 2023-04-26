import pool from "../../config/mysql";
import connectMongo from "@/config/connectMongo";
import Account from "../../models/account";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { cId, cAccountNumber, revertBack } = req.body;

      //create connection
      const connection = await pool.getConnection();

      //perform query on offers table and cart table
      //get the offers that are applicable to the cart

      const [offers] = await connection.query(
        "SELECT * FROM offers JOIN cart ON offers.pId = cart.pId JOIN wallet ON offers.giverId = wallet.id WHERE cart.cId = ? AND offers.startDate <= CURDATE() AND offers.endDate >= CURDATE()",
        [cId]
      );

      //join cart and products on pId and pId
      /*
        get accountNumber of sId (in products table) from wallet table
        SELECT * FROM cart JOIN products ON cart.pId = products.pId JOIN wallet ON products.sId = wallet.id WHERE cart.cId = 1; 


      */
      const [cart] = await connection.query(
        "SELECT * FROM cart JOIN products ON cart.pId = products.pId JOIN wallet ON products.sId = wallet.id WHERE cart.cId = ?",
        [cId]
      );

      connection.release();

      //maintain a dictionary of amount to be paid for each seller id (sId)
      let amountToBePaid = {};

      //deduct the discount from giverId maintain dictionary
      let discountToBeDeducted = {};

      for (let item of cart) {
        let amount = 0;

        const [product] = await connection.query(
          "SELECT * FROM products WHERE pId = ?",
          [item.pId]
        );

        //check if offer is applicable for the product
        let offer = offers.find((offer) => offer.pId === item.pId);
        let sellerAmount = 0;

        //if offer is applicable, then calculate the amount to be paid
        if (offer) {
          //discount is percentage

          let discount =
            (product[0].pCost * item.quantity * offer.discount) / 100;

          //49900*2*10.0/100 = 9980
          amount = product[0].pCost * item.quantity - discount;
          sellerAmount = product[0].pCost * item.quantity;
          //amount = 49900*2 - 9980 = 89820

          //seller will get 89820
          //giver will give 9980

          item["amount"] = amount;
          item["offerId"] = offer.offerId;

          //if giverId is not present in the dictionary, then add it
          if (!discountToBeDeducted[offer.accountNumber]) {
            discountToBeDeducted[offer.accountNumber] = discount;
          }
          //else add the discount to the existing discount
          else {
            discountToBeDeducted[offer.accountNumber] += discount;
          }
        } else {
          amount = product[0].pCost * item.quantity;
          sellerAmount = product[0].pCost * item.quantity;
          item["amount"] = amount;
          item["offerId"] = null;
        }

        //if sId is not present in the dictionary, then add it
        if (!amountToBePaid[item.accountNumber]) {
          amountToBePaid[item.accountNumber] = sellerAmount;
        }
        //else add the amount to the existing amount
        else {
          amountToBePaid[item.accountNumber] += sellerAmount;
        }
      }

      // console.log(amountToBePaid);
      // console.log(discountToBeDeducted);

      //get the connection to the mongo database
      const mongoConnection = await connectMongo();

      //add amount to be paid and discount to be deducted in balance of the account
      //update the balance of the account
      if (revertBack === "0") {
        for (let accountNumber in amountToBePaid) {
          await Account.updateOne(
            { accountNumber: accountNumber },
            { $inc: { balance: amountToBePaid[accountNumber] } }
          );
        }

        //update the balance of the account
        for (let accountNumber in discountToBeDeducted) {
          await Account.updateOne(
            { accountNumber: accountNumber },
            { $inc: { balance: -discountToBeDeducted[accountNumber] } }
          );
        }
      }

      const con = await pool.getConnection();

      //insert into orders table
      const [result] = await con.query(
        "INSERT INTO orders(cId,account) VALUES(?,?)",
        [cId, cAccountNumber]
      );

      //insert into purchase_details table
      for (let item of cart) {
        await con.query(
          "INSERT INTO purchase_details(oId,pId,quantity,offerId,price) VALUES(?,?,?,?,?)",
          [result.insertId, item.pId, item.quantity, item.offerId, item.amount]
        );
      }

      //decrease pQty from products table
      for (let item of cart) {
        await con.query("UPDATE products SET pQty = pQty - ? WHERE pId = ?", [
          item.quantity,
          item.pId,
        ]);
      }

      res.status(200).json({ message: "Order Placed" });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Server Error" });
    }
  } else if (req.method === "GET") {
    try {
      const { cId } = req.query;
      const connection = await pool.getConnection();
      const response = [];

      const [orders] = await connection.query(
        "SELECT * FROM orders JOIN purchase_details ON orders.oId = purchase_details.oId JOIN products ON purchase_details.pId = products.pId WHERE orders.cId = ? ORDER BY orders.oId DESC",
        [cId]
      );

      for (let order of orders) {
        let index = response.findIndex((item) => item.oId === order.oId);

        if (index === -1) {
          response.push({
            oId: order.oId,
            cId: order.cId,
            items: [
              {
                pId: order.pId,
                name: order.pName,
                price: order.price,
                quantity: order.quantity,
                image: order.pImg,
                desc: order.pDesc,
                offerId: order.offerId,
              },
            ],
          });
        } else {
          response[index].items.push({
            pId: order.pId,
            name: order.pName,
            price: order.price,
            quantity: order.quantity,
            image: order.pImg,
            desc: order.pDesc,
            offerId: order.offerId,
          });
        }
      }

      res.status(200).json(response);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Server Error" });
    }
  }
}
