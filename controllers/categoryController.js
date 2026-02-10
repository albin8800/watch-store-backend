import Category from "../models/Category.js";

export const addCategory = async(req, res) => {
    try {
        const { name } = req.body;

        if(!name || !req.file) {
            return res.status(400),json({ message: "Name and Image are required" })
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
        const categories = await Category.find().sort({ createdAt: -1});
        res.json(categories);
    } catch (error) {
        console.error(error);
      res.status(500).json({ message: "Failed to fetch Categories"})  
    }
}