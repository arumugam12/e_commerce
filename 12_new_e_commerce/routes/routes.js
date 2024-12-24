import express from 'express';
import userRouter from '../user/routes/user.route.js';
import sellerRouter from '../seller/routes/seller.route.js';
import productRouter from '../product/routes/product.route.js';
import cartRouter from '../cart/routes/cart.route.js';
import orderRouter from '../order/routes/order.route.js';

const router = express.Router();

router.use("/user", userRouter);
router.use("/seller", sellerRouter);
router.use("/product", productRouter);
router.use("/cart", cartRouter);
router.use("/order", orderRouter);

export default router;