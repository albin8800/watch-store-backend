import express from "express";
import upload from "../middleware/upload.js"
import { addCategory, getCategories, updateCategory } from "../controllers/categoryController.js";

const router = express.Router();

router.post("/", upload.single("image"), addCategory);
router.get("/", getCategories);
router.put("/:id", upload.single("image"), updateCategory);

export default router;