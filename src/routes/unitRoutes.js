import express from "express";
import {
  createUnitController,
  deleteUnitController,
  getUnitController,
  getUnitsController,
  updateUnitController,
} from "../controller/unitController.js";

const router = express.Router();

router.get("/units", getUnitsController);
router.get("/units/:unit_id", getUnitController);
router.post("/units", createUnitController);
router.put("/units/:unit_id", updateUnitController);
router.delete("/units/:unit_id", deleteUnitController);

export default router;
