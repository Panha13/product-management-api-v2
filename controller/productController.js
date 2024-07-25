import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../models/productModel.js";

//Get product controller
export const getProductsController = (req, res) => {
  getProducts((err, products) => {
    if (err) return res.status(500).json({ error: "Internal Server Error" });
    res.status(200).json(products);
  });
};

//Get product by id controller
export const getProductController = (req, res) => {
  const { product_id } = req.params;
  getProduct(product_id, (err, product) => {
    if (err) return res.status(404).json({ error: err.message });
    res.status(200).json(product);
  });
};

//Create product controller
export const createProductController = (req, res) => {
  const { image, name, price, stock_quantity } = req.body;

  if (!image) {
    return res.status(400).json({ error: "Image is required" });
  }

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({
      error: "Category name is required and must be a non-empty string.",
    });
  }

  if (!price || typeof price !== "number") {
    return res.status(400).json({
      error: "Price is required and should be number!",
    });
  }

  if (!stock_quantity || !Number.isInteger(stock_quantity)) {
    return res.status(400).json({
      error: "Stock quantity is required and should be an integer!",
    });
  }

  createProduct(req.body, (err, productId) => {
    if (err) return res.status(500).json({ error: "Internal Server Error" });
    res.status(201).json(productId);
  });
};

//Update product controller
export const updateProdctController = (req, res) => {
  const { product_id } = req.params;
  updateProduct(product_id, req.body, (err, affectedRows) => {
    if (err) return res.status(500).json({ error: "Internal Server Error" });
    if (affectedRows === 0)
      return res.status(404).json({ error: "Product not found" });
    res.status(200).json({ message: "Product updated" });
  });
};

//Delete Proudct controller
export const deleteProudctController = (req, res) => {
  const { product_id } = req.params;
  deleteProduct(product_id, (err, affectedRows) => {
    if (err) return res.status(500).json({ error: "Internal Server Error" });
    if (affectedRows === 0)
      return res.status(404).json({ error: "Proudct not found" });
    res.status(200).json({ message: "Proudct deleted" });
  });
};
