import Category from '../models/Category.js';
import Product from '../models/Product.js';

export const createProduct = async (req, res) => {
    try {
        const {
            name,
            brand,
            categoryId,
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

        if(!categoryId) {
            return res.status(400).json({ message: "Category is required"});
        }
        const category = await Category.findById(categoryId);
        if(!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        const product = await Product.create({
            name,
            brand,
            categoryId,
            price,
            mrp,
            description,
            stock,
            isPopular,
            isWidest,
            image: req.file.path,
        });

        category.count += 1;
        await category.save();

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

export const getProducts = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit);
        const skip = (page -1) * limit;

        const { popular, wide } = req.query;

        const filter = {};

        if (req.query.category) {
            filter.categoryId = req.query.category;
        }

        if (popular === true) {
            filter.isPopular = true;
        }
        if (wide === true) {
            filter.isWidest = true;
        }

        const totalProducts = await Product.countDocuments(filter);

        const products = await Product.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .populate("categoryId", "name")

        res.status(200).json({
            products,
            currentPage: page,
            totalPages: Math.ceil(totalProducts / limit),
            totalProducts,
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch products",
            error: error.message,
        })
    }
}