import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService.js";
import {
  validateCreateProductData,
  validateUpdateProductData,
} from "../utils/validation.js";
import { uploadImage } from "../utils/uploadImage.js";

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

// Create product Controller
export const createProductController = async (req, res) => {
  // const validationError = validateCreateProductData(req.body);
  // if (validationError) {
  //   return res.status(400).json({ error: validationError });
  // }
  const price = parseFloat(req.body.price);
  const stock_quantity = parseInt(req.body.stock_quantity);
  const unit_id = parseInt(req.body.unit_id);
  const category_id = parseInt(req.body.category_id);

  try {
    const imageUrl = await uploadImage(req.file);
    const productData = {
      ...req.body,
      image: imageUrl,
      price,
      stock_quantity,
      unit_id,
      category_id,
    };
    const product = await createProduct(productData);
    // const product = await createProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update Product Controller
export const updateProductController = async (req, res) => {
  const { product_id } = req.params;
  const validationError = validateUpdateProductData(req.body);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    const product = await updateProduct(product_id, req.body);
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
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
