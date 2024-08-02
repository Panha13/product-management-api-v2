import prisma from "../config/prismaClient.js";

//Get all Units
export const getUnits = async () => {
  try {
    const units = await prisma.unit.findMany();
    return units;
  } catch (err) {
    throw new Error(err.message);
  }
};

//Get unit by Id
export const getUnit = async (unit_id) => {
  try {
    const result = await prisma.unit.findUnique({
      where: { unit_id: unit_id },
    });
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

//Create Unit
export const createUnit = async (unit) => {
  const { name, description } = unit;
  try {
    const result = await prisma.unit.create({
      data: { name, description },
    });
    return result;
  } catch (err) {
    if (err.code === "P2002") {
      throw new Error("Name alreay exist!");
    }
    throw new Error(err.message);
  }
};

//Update unit
export const updateUnit = async (unit_id, unit) => {
  const { name, description } = unit;
  try {
    const result = await prisma.unit.update({
      where: { unit_id: parseInt(unit_id, 10) },
      data: { name, description },
    });
    return result;
  } catch (err) {
    console.log(err);
    if (err.code === "P2002") {
      throw new Error("Name alreay exist!");
    }
    throw new Error(err.message);
  }
};

//Delete Unit
export const deleteUnit = async (unit_id) => {
  try {
    const result = await prisma.unit.delete({
      where: { unit_id: parseInt(unit_id) },
    });
    return result;
  } catch (err) {
    if (err.code === "P2025") {
      throw new Error("Unit not found");
    }
    throw new Error(err.message);
  }
};
