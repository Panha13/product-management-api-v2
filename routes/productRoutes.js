import express from "express";
import {
  createProductController,
  deleteProudctController,
  getProductController,
  getProductsController,
  updateProdctController,
} from "../controller/productController.js";

const router = express.Router();

router.get("/products", getProductsController);
router.get("/products/:product_id", getProductController);
router.post("/products", createProductController);
router.put("/products/:product_id", updateProdctController);
router.delete("/products/:product_id", deleteProudctController);

export default router;
