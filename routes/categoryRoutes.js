import express from "express";
import upload from "../middleware/upload.js"
import { addCategory, getCategories } from "../controllers/categoryController.js";

const router = express.Router();

router.post("/", upload.single("image"), addCategory);
router.get("/", getCategories);

export default router;