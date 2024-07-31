import express from "express";
import {
  createCategoryController,
  deleteCategoryController,
  getCategoriesController,
  getCategoyByIdController,
  updatecategoryController,
} from "../controller/categoryController.js";

const router = express.Router();

router.post("/categories", createCategoryController);
router.get("/categories", getCategoriesController);
router.get("/categories/:category_id", getCategoyByIdController);
router.put("/categories/:category_id", updatecategoryController);
router.delete("/categories/:category_id", deleteCategoryController);

export default router;
