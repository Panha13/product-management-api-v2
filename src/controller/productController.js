import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService.js";

// Get all products
export const getProductsController = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const pageSize = parseInt(req.query.pageSize, 10) || 10;
  const searchQuery = req.query.searchQuery || "";

  try {
    const { products, total } = await getProducts(page, pageSize, searchQuery);
    res.status(200).json({ data: products, total, page, pageSize });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get product by id
export const getProductController = async (req, res) => {
  const { product_id } = req.params;

  try {
    const product = await getProduct(product_id);
    res.status(200).json(product);
  } catch (err) {
    res
      .status(err.message === "Product not found" ? 404 : 500)
      .json({ error: err.message });
  }
};

// Create product
export const createProductController = async (req, res) => {
  const { image, name, price, stock_quantity, category_id, unit_id } = req.body;

  try {
    const product = await createProduct({
      image,
      name,
      price,
      stock_quantity,
      category_id,
      unit_id,
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update product
export const updateProductController = async (req, res) => {
  const { product_id } = req.params;
  const { image, name, price, stock_quantity, category_id } = req.body;

  try {
    const product = await updateProduct(product_id, {
      image,
      name,
      price,
      stock_quantity,
      category_id,
    });
    res.status(200).json(product);
  } catch (err) {
    res
      .status(err.message === "Product not found" ? 404 : 400)
      .json({ error: err.message });
  }
};

// Delete product
export const deleteProductController = async (req, res) => {
  const { product_id } = req.params;

  try {
    await deleteProduct(product_id);
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    res
      .status(err.message === "Product not found" ? 404 : 500)
      .json({ error: err.message });
  }
};
