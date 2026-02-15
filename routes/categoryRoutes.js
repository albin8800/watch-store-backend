import express from "express";
import upload from "../middleware/upload.js"
import { addCategory, deleteCategory, getCategories, updateCategory } from "../controllers/categoryController.js";

const router = express.Router();

router.post("/", upload.single("image"), addCategory);
router.get("/", getCategories);
router.put("/:id", upload.single("image"), updateCategory);
router.delete("/:id", deleteCategory);

export default router;