import express from 'express';
import upload from '../middleware/upload.js'
import { createProduct, deleteProduct, getProducts, getProeductById, updateProduct } from '../controllers/productController.js';

const router = express.Router();

router.post("/", upload.single("image"), createProduct);
router.get("/", getProducts);
router.get("/:id", getProeductById);
router.put("/:id", upload.single("image"), updateProduct);
router.delete("/:id", deleteProduct);

export default router;