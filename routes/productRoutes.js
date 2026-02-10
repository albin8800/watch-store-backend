import express from 'express';
import upload from '../middleware/upload.js'
import { createProduct } from '../controllers/productController.js';

const router = express.Router();

router.post("/", upload.single("image"), createProduct);

export default router;