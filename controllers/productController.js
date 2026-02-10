import Product from '../models/Product.js';

export const createProduct = async (req, res) => {
    try {
        const {
            name,
            brand,
            category,
            price,
            mrp,
            description,
            stock,
            isPopular,
            isWidest
        } = req.body

        if (!req.file) {
            return res.status(400).json({ message: "Product image is required" });
        }

        const product = await Product.create({
            name,
            brand,
            category,
            price,
            mrp,
            description,
            stock,
            isPopular,
            isWidest,
            image: req.file.path,
        });
        res.status(201).json({
            message: "Product created succesfully",
            product,
        })
    } catch (error) {
        res.status(500).json({
            message: "Failed to create product",
            error: error.message,
        })
    }
}