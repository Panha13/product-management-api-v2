import {
  createCategory,
  getCategories,
  getCategoyById,
  updatecategory,
  deleteCategory,
} from "../models/categoryModel.js";

//Create Category
export const createCategoryController = (req, res) => {
  // Without destructuring
  // const name = req.body.name;
  // const description = req.body.description;
  // With destructuring
  const { name } = req.body;

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({
      error: "Category name is required and must be a non-empty string.",
    });
  }

  createCategory(req.body, (err, categoryId) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({ error: "Category name already exists" });
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.status(201).json({ categoryId });
  });
};

//Get all category
export const getCategoriesController = (req, res) => {
  getCategories((err, categories) => {
    if (err) return res.status(500).json({ error: "Internal Server Error" });
    res.status(200).json(categories);
  });
};

//Get category by id
export const getCategoyByIdController = (req, res) => {
  const { category_id } = req.params;
  getCategoyById(category_id, (err, category) => {
    if (err) return res.status(404).json({ error: err.message });
    res.status(200).json(category);
  });
};

//Update category
export const updatecategoryController = (req, res) => {
  const { category_id } = req.params;
  updatecategory(category_id, req.body, (err, affectedRows) => {
    if (err) return res.status(500).json({ error: "Internal Server Error" });
    if (affectedRows === 0)
      return res.status(404).json({ error: "Category not found" });
    res.status(200).json({ message: "Category updated" });
  });
};

//Delete Category controller
export const deleteCategoryController = (req, res) => {
  const { category_id } = req.params;
  deleteCategory(category_id, (err, affectedRows) => {
    if (err) return res.status(500).json({ error: "Internal Server Error" });
    if (affectedRows === 0)
      return res.status(404).json({ error: "Category not found" });
    res.status(200).json({ message: "Category deleted" });
  });
};
