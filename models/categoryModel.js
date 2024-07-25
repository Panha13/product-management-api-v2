import connection from "../config/db.js";

//create category
export const createCategory = (category, callback) => {
  const { name, description } = category;
  const query = "INSERT INTO categories (name, description) VALUES (?, ?)";
  connection.query(query, [name, description], (err, results) => {
    if (err) return callback(err);
    callback(null, results.insertId);
  });
};

//get all categories
export const getCategories = (callback) => {
  connection.query("SELECT * FROM categories", (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

//get single category by id
export const getCategoyById = (category_id, callback) => {
  connection.query(
    "SELECT * FROM categories WHERE category_id = ?",
    [category_id],
    (err, results) => {
      if (err) return callback(err);
      if (results.length === 0)
        return callback(new Error("Category not found"));
      callback(null, results[0]);
    }
  );
};

//Update category
export const updatecategory = (category_id, updates, callback) => {
  const { name, description } = updates;
  const query =
    "UPDATE categories SET name = ?, description = ? WHERE category_id = ?";
  connection.query(query, [name, description, category_id], (err, results) => {
    if (err) return callback(err);
    callback(null, results.affectedRows);
  });
};

//Delete Category
export const deleteCategory = (category_id, callback) => {
  connection.query(
    "DELETE FROM categories WHERE category_id = ?",
    [category_id],
    (err, results) => {
      if (err) return callback(err);
      callback(null, results.affectedRows);
    }
  );
};
