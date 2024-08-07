import express from "express";
import multer from "multer";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getProductsController,
  updateProductController,
} from "../controller/productController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/products", getProductsController);
router.get("/products/:product_id", getProductController);
router.post("/products", upload.single("image"), createProductController);
router.put("/products/:product_id", updateProductController);
router.delete("/products/:product_id", deleteProductController);

export default router;
