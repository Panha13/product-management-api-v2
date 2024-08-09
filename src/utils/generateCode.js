/**
 * Generates a sequential code with a given prefix.
 * @param {string} prefix - The prefix for the code (e.g., 'P' for products).
 * @param {number} baseCode - The starting number for the sequence.
 * @param {string} tableName - The name of the table to check for existing codes.
 * @param {PrismaClient} prisma - The Prisma client instance.
 * @returns {Promise<string>} - The generated code.
 */
export const generateCode = async (prefix, baseCode, tableName, prisma) => {
  try {
    // Retrieve the highest code currently in use
    const maxCodeProduct = await prisma[tableName].findFirst({
      orderBy: { code: "desc" },
      select: { code: true },
    });

    // Generate the next code starting from baseCode
    const lastCodeNumber = maxCodeProduct
      ? parseInt(maxCodeProduct.code.substring(prefix.length))
      : baseCode - 1;
    return `${prefix}${(lastCodeNumber + 1).toString().padStart(4, "0")}`;
  } catch (err) {
    throw new Error("Internal Server Error");
  }
};
