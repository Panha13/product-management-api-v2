import prisma from "../config/prismaClient.js";

//Get all categories
export const getCategories = async () => {
  try {
    const categories = await prisma.categories.findMany();
    return categories;
  } catch (error) {
    throw new Error(error.message);
  }
};

//Get categories by ID
export const getCategoryById = async (category_id) => {
  try {
    const result = await prisma.categories.findUnique({
      where: { category_id: category_id },
    });
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

//Create Category
export const createCategory = async (category) => {
  const { name, description } = category;
  try {
    const result = await prisma.categories.create({
      data: { name, description },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

//Update Category
export const updateCategory = async (category_id, updates) => {
  const { name, description } = updates;
  try {
    const result = await prisma.categories.update({
      where: { category_id: parseInt(category_id, 10) },
      data: { name, description },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

//Delete Categories
export const deleteCategory = async (category_id) => {
  try {
    const result = await prisma.categories.delete({
      where: { category_id: category_id },
    });
    return result;
  } catch (err) {
    if (err.code === "P2025") {
      throw new Error("Category not found");
    }
    throw new Error("Internal Server Error");
  }
};
