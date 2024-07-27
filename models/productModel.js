import connection from "../config/db.js";

//Transform product results
const transformProductResults = (results) => {
  return results.map((row) => ({
    product_id: row.product_id,
    image: row.image,
    product_name: row.product_name,
    price: row.price,
    stock_quantity: row.stock_quantity,
    category: {
      category_id: row.category_id,
      name: row.category_name,
    },
    description: row.description,
  }));
};

//Get all products
export const getProducts = (callback) => {
  const query = `
    SELECT p.product_id, p.image, p.name AS product_name, p.description, p.price, p.stock_quantity, 
           c.category_id, c.name AS category_name
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.category_id
  `;

  connection.query(query, (err, results) => {
    if (err) return callback(err);
    const transformResults = transformProductResults(results);
    callback(null, transformResults);
  });
};

//Get product by id
export const getProduct = (product_id, callback) => {
  const query = `
    SELECT p.product_id, p.image, p.name AS product_name, p.description, p.price, p.stock_quantity, 
           c.category_id, c.name AS category_name
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.category_id
    WHERE p.product_id = ?
    `;

  connection.query(query, [product_id], (err, results) => {
    if (err) return callback(err);
    if (results.length === 0) return callback(new Error("Product not found"));
    const transformResults = transformProductResults(results);
    callback(null, transformResults[0]);
  });
};

//Create product model
export const createProduct = (product, callback) => {
  const { image, name, description, price, stock_quantity, category } = product;
  const query =
    "INSERT INTO products (image, name, description, price, stock_quantity, category_id) VALUES (?, ?, ?, ?, ?,?)";
  connection.query(
    query,
    [image, name, description, price, stock_quantity, category],
    (err, results) => {
      if (err) return callback(err);
      callback(null, results.insertId);
    }
  );
};

// Update product model
export const updateProduct = (product_id, product, callback) => {
  const { image, name, description, price, stock_quantity, category } = product;
  const query = `
      UPDATE products
      SET image=?, name = ?, description = ?, price = ?, stock_quantity = ?, category_id = ?
      WHERE product_id = ?
    `;
  connection.query(
    query,
    [image, name, description, price, stock_quantity, category, product_id],
    (err, results) => {
      if (err) return callback(err);
      callback(null, results.affectedRows);
    }
  );
};

//Delete product model
export const deleteProduct = (product_id, callback) => {
  connection.query(
    "DELETE FROM products WHERE product_id = ?",
    [product_id],
    (err, results) => {
      if (err) return callback(err);
      callback(null, results.affectedRows);
    }
  );
};