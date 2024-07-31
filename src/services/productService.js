import prisma from "../config/prismaClient.js";
import { generateCode } from "../utils/generateCode.js";

// Get all products
export const getProducts = async (page, pageSize, searchQuery = "") => {
  const offset = (page - 1) * pageSize;

  try {
    const products = await prisma.products.findMany({
      where: {
        name: {
          contains: searchQuery,
        },
      },
      skip: offset,
      take: pageSize,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: {
          select: {
            category_id: true,
            name: true,
          },
        },
      },
    });

    const total = await prisma.products.count({
      where: {
        name: {
          contains: searchQuery,
        },
      },
    });

    return { products, total };
  } catch (err) {
    throw new Error("Internal Server Error");
  }
};

// Get products by id
export const getProduct = async (product_id) => {
  try {
    const products = await prisma.products.findUnique({
      where: { product_id: parseInt(product_id, 10) },
      include: {
        category: {
          select: {
            category_id: true,
            name: true,
          },
        },
      },
    });

    if (!products) {
      throw new Error("products not found");
    }

    return products;
  } catch (err) {
    throw new Error(err.message);
  }
};

// Create products
export const createProduct = async (products) => {
  const { image, name, price, stock_quantity, category_id, unit_id } = products;
  // Validate required fields
  if (!image || !name || !price || !stock_quantity || !unit_id) {
    throw new Error("Required fields missing");
  }

  try {
    // Generate the new product code
    const newCode = await generateCode("P", 1, "products", prisma);

    // Create the new product in the database
    const newProduct = await prisma.products.create({
      data: {
        code: newCode,
        image,
        name,
        price,
        stock_quantity,
        category_id,
        unit_id,
      },
    });

    return newProduct;
  } catch (err) {
    // Log the error for debugging
    console.error("Error creating product:", err);
    throw new Error("Internal Server Error");
  }
};

// Update products
export const updateProduct = async (product_id, products) => {
  const { image, name, price, stock_quantity, category_id } = products;

  if (!image || !name || !price || !stock_quantity) {
    throw new Error("Required fields missing");
  }

  try {
    return await prisma.products.update({
      where: { product_id: parseInt(product_id, 10) },
      data: { image, name, price, stock_quantity, category_id },
    });
  } catch (err) {
    if (err.code === "P2025") {
      throw new Error("products not found");
    }
    throw new Error("Internal Server Error");
  }
};

// Delete products
export const deleteProduct = async (product_id) => {
  try {
    return await prisma.products.delete({
      where: { product_id: parseInt(product_id, 10) },
    });
  } catch (err) {
    if (err.code === "P2025") {
      throw new Error("products not found");
    }
    throw new Error("Internal Server Error");
  }
};
