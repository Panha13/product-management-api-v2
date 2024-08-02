const validateImage = (image) => typeof image === "string";
const validateName = (name) => typeof name === "string";
const validatePrice = (price) => typeof price === "number" && price >= 0;
const validateStockQuantity = (stock_quantity) =>
  typeof stock_quantity === "number" && stock_quantity >= 0;
const validateCategoryId = (category_id) =>
  Number.isInteger(category_id) || category_id === undefined;
const validateUnitId = (unit_id) => typeof unit_id === "number";

export const validateCreateProductData = (data) => {
  const { image, name, price, stock_quantity, category_id, unit_id } = data;
  if (!validateImage(image)) return "Image is required and must be a string.";
  if (!validateName(name)) return "Name is required and must be a string.";
  if (!validatePrice(price)) return "Price must be a non-negative number.";
  if (!validateStockQuantity(stock_quantity))
    return "Stock quantity must be a non-negative number.";
  if (!validateUnitId(unit_id))
    return "Unit ID is required and must be a number.";
  if (!validateCategoryId(category_id))
    return "Category ID must be an integer.";
  return null;
};

export const validateUpdateProductData = (data) => {
  const { image, name, price, stock_quantity, category_id, unit_id } = data;
  if (image !== undefined && !validateImage(image))
    return "Image must be a string.";
  if (name !== undefined && !validateName(name))
    return "Name must be a string.";
  if (price !== undefined && !validatePrice(price))
    return "Price must be a non-negative number.";
  if (stock_quantity !== undefined && !validateStockQuantity(stock_quantity))
    return "Stock quantity must be a non-negative number.";
  if (category_id !== undefined && !validateCategoryId(category_id))
    return "Category ID must be an integer.";
  if (unit_id !== undefined && !validateUnitId(unit_id))
    return "Unit ID must be a number.";
  return null;
};
