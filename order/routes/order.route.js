import express from "express";
import { authenticate } from "../../middleware/authenticate.js";
import { addOrder, getAllOrdersByUserId, cancelOrder } from "../controller/order.controller.js";

const orderRouter = express.Router();

orderRouter.post("/add_order", authenticate, addOrder);
orderRouter.get("/get_orders_userid/:id", authenticate, getAllOrdersByUserId);
orderRouter.delete("/cancel_order/:id", authenticate, cancelOrder);

export default orderRouter;