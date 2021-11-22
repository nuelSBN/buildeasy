import nc from "next-connect";
import Order from "../../../../models/Order";
import db from "../../../../utils/db";
import { isAuth } from "../../../../utils/auth";

const handler = nc();

handler.get(async (req, res) => {
  handler.use(isAuth);
  await db.connect();
  const order = await Order.findById(req.query.id);
  await db.disconnect();
  res.send(order);
});

export default handler;
