import express from 'express';
import { authenticate } from '../../middleware/authenticate.js';
import { signIn, logIn, registerSeller, updateSeller, deleteSeller, getSeller, getAllSeller } from '../controller/seller.controller.js';

const sellerRouter = express.Router();

sellerRouter.post("/signin", signIn);
sellerRouter.post("/login", logIn);
sellerRouter.post("/register_shop", authenticate, registerSeller)
sellerRouter.post("/update_seller", authenticate, updateSeller);
sellerRouter.delete("/delete_seller", authenticate, deleteSeller);
sellerRouter.get("/get_seller", authenticate, getSeller);
sellerRouter.get("/get_all_seller", getAllSeller);

export default sellerRouter;