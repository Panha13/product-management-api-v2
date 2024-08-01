import express from "express";
import {
  createCategoryController,
  deleteCategoryController,
  getCategoriesController,
  getCategoryByIdController,
  updateCategoryController,
} from "../controller/categoryController.js";

const router = express.Router();

router.post("/categories", createCategoryController);
router.get("/categories", getCategoriesController);
router.get("/categories/:category_id", getCategoryByIdController);
router.put("/categories/:category_id", updateCategoryController);
router.delete("/categories/:category_id", deleteCategoryController);

export default router;
