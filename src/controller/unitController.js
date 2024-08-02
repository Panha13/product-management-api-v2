import {
  createUnit,
  deleteUnit,
  getUnit,
  getUnits,
  updateUnit,
} from "../services/unitService.js";

//Get All unit
export const getUnitsController = async (req, res) => {
  try {
    const units = await getUnits();
    res.status(200).json(units);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Get unit by id
export const getUnitController = async (req, res) => {
  const { unit_id } = req.params;
  try {
    const unit = await getUnit(parseInt(unit_id, 10));
    if (!unit) return res.status(404).json({ error: "Unit not found!" });
    res.status(200).json(unit);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Create Unit Controller
export const createUnitController = async (req, res) => {
  const { name, description } = req.body;

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({
      error: "Unit name is required and must be a non-empty string.",
    });
  }

  try {
    const unit = await createUnit({ name, description });
    res.status(201).json(unit);
  } catch (err) {
    if (err.message.includes("Name alreay exist!")) {
      return res.status(409).json({
        error: "A unit with this name already exists.",
      });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Update Unit Controller
export const updateUnitController = async (req, res) => {
  const { unit_id } = req.params;

  try {
    const unit = await updateUnit(parseInt(unit_id, 10), req.body);
    res.status(200).json(unit);
  } catch (err) {
    if (err.message.includes("Name alreay exist!")) {
      return res.status(409).json({
        error: "A unit with this name already exists.",
      });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Delete Unit Controller
export const deleteUnitController = async (req, res) => {
  const { unit_id } = req.params;

  try {
    await deleteUnit(parseInt(unit_id, 10));
    res.status(200).json({ message: "Unit Deleted" });
  } catch (err) {
    res
      .status(err.message === "Unit not found" ? 404 : 500)
      .json({ error: err.message });
  }
};
