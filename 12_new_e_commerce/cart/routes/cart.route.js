import express from 'express';
import { authenticate } from "../../middleware/authenticate.js"
import { addProductToCart, getCartByUserId, deleteCartProduct } from '../controller/cart.controller.js';

const cartRouter = express.Router();

cartRouter.post("/add_to_cart", authenticate, addProductToCart);
cartRouter.get("/get_cart/:id", authenticate, getCartByUserId);
cartRouter.patch("/delete_cart", authenticate, deleteCartProduct)

export default cartRouter;