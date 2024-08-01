import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../services/categoryService.js";

//Get all categories
export const getCategoriesController = async (req, res) => {
  try {
    const categories = await getCategories();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Get By Category ID
export const getCategoryByIdController = async (req, res) => {
  const { category_id } = req.params;

  try {
    const category = await getCategoryById(parseInt(category_id, 10));
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Create Category Controller
export const createCategoryController = async (req, res) => {
  const { name, description } = req.body;

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({
      error: "Category name is required and must be a non-empty string.",
    });
  }

  try {
    const category = await createCategory({ name, description });
    res.status(201).json({ categoryId: category.category_id });
  } catch (err) {
    if (err.code === "P2002") {
      return res.status(409).json({ error: "Category name already exists" });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Update Category Controller
export const updateCategoryController = async (req, res) => {
  const { category_id } = req.params;

  try {
    const category = await updateCategory(parseInt(category_id, 10), req.body);
    res.status(200).json(category);
  } catch (err) {
    if (err.code === "P2002") {
      return res.status(409).json({ error: "Category name already exists" });
    }
    res.status(500).json({ error: err.message });
  }
};

//Delete Category Controller
export const deleteCategoryController = async (req, res) => {
  const { category_id } = req.params;

  try {
    await deleteCategory(parseInt(category_id, 10));
    res.status(200).json({ message: "Category deleted" });
  } catch (err) {
    res
      .status(err.message === "Category not found" ? 404 : 500)
      .json({ error: err.message });
  }
};
