import express from "express";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getProductsController,
  updateProductController,
} from "../controller/productController.js";

const router = express.Router();

router.get("/products", getProductsController);
router.get("/products/:product_id", getProductController);
router.post("/products", createProductController);
router.put("/products/:product_id", updateProductController);
router.delete("/products/:product_id", deleteProductController);

export default router;
