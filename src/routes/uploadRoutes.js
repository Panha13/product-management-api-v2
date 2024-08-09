import express from "express";
import multer from "multer";
import uploadImage from "../controller/uploadController.js";

const router = express.Router();
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), uploadImage);

export default router;
