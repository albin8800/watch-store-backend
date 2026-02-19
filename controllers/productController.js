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
        } = req.body

        const isPopular = JSON.parse(req.body.isPopular || "false");
        const isWidest = JSON.parse(req.body.isWidest || "false");


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

        if (popular === "true") {
            filter.isPopular = true;
        }
        if (wide === "true") {
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

export const updateProduct = async (req, res) => {
   try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if(!products) {
        return res.status(404).json({
            message: "Product not Found"
        });
    }

    const {
            name,
            brand,
            categoryId,
            price,
            mrp,
            description,
            stock,
        } = req.body

    const isPopular = JSON.parse(req.body.isPopular || "false");
    const isWidest = JSON.parse(req.body.isWidest || "false");

        product.name = name;
        product.brand = brand;
        product.categoryId = categoryId;
        product.price = price;
        product.mrp = mrp;
        product.description = description;
        product.stock = stock;
        product.isPopular = isPopular;
        product.isWidest = isWidest;

        if(req.file) {
            product.image = req.file.path;
        }

        await product.save();

        res.status(200).json({
            message: "Product updated Succesfully",
            product,
        });

   } catch (error) {
    res.status(500).json({
        message: "Failed to Update Product",
        error: error.message,
    })
   }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        if(!product) {
            return res.status(404).json({
                message: "Product not Found"
            });
        }

        const category = await Category.findById(product.categoryId);

        if(category && category.count > 0) {
            category.count -= 1;
            await category.save();
        }

        await Product.findByIdAndDelete(id);
        res.status(200).json({
            message: "Product deleted Succesfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete product",
            error: error.message,
        })
    }
}