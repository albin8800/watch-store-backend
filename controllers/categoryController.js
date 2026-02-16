import Category from "../models/Category.js";

export const addCategory = async(req, res) => {
    try {
        const { name } = req.body;

        if(!name || !req.file) {
            return res.status(400).json({ message: "Name and Image are required" })
        }

        const exists = await Category.findOne({
            name: name.trim().toLowerCase(),
        });

        if(exists) {
            return res.status(400).json({ message: "Category already exists" });
        }

        const category = await Category.create({
            name: name.trim(),
            image: req.file.path,
            count: 0,
        });
        res.status(201).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to add Category" });
    }
}

export const getCategories = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const totalCategories = await Category.countDocuments();

        const categories = await Category.find()
        .sort({ createdAt: -1})
        .skip(skip)
        .limit(limit);

        const totalPages = Math.ceil(totalCategories / limit);
        res.json({
            categories,
            currentPage: page,
            totalPages,
            totalCategories
        });
    } catch (error) {
        console.error(error);
      res.status(500).json({ message: "Failed to fetch Categories"})  
    }
}

export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findById(id);

        if(!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        if(req.body.name) {
            category.name = req.body.name;
        }

        if(req.file) {
            category.image = req.file.path;
        } 

        await category.save();
        res.status (200).json(category);
        
    } catch (error) {
         console.error(error);

        res.status(500).json({
        message: "Update failed",
         });
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findById(id);

        if(!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        await Category.findByIdAndDelete(id);

        res.status(200).json({
            message: "Category Deleted Succesfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to delete Category"
        })
    }
}