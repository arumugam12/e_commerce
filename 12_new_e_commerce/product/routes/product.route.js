import express from 'express';
import { authenticate } from "../../middleware/authenticate.js"
import { createProduct, updateProductById, deleteProduct, getProductById, getProductsBySellerId, getProduct } from '../controller/product.controller.js';

const productRouter = express.Router();

productRouter.post("/create_product", authenticate, createProduct);
productRouter.post("/update_product/:product_id", authenticate, updateProductById);
productRouter.get("/get_product/:product_id", authenticate, getProductById);
productRouter.get("/get_product_seller", authenticate, getProductsBySellerId);
productRouter.delete("/delete_product/:product_id", authenticate, deleteProduct);
productRouter.get("/get_products", authenticate, getProduct)

export default productRouter;