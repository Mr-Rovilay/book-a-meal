import Product from "../models/productModel.js";
import fs from "fs"

export const addProduct = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const { name, price, description, category } = req.body;

    // Check if all required fields are provided
    if (!name || !price || !category || !description) {
        return res.status(400).json({ message: "Please provide all required fields: name, price, category, and description" });
    }

    try {
        const newProduct = new Product({
            name,
            price,
            description,
            category,
            image: req.file.filename,
        });

        await newProduct.save();

        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}
export const ProductList = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json({data:products});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }   
}

export const removeProduct = async (req, res) => {  
    try {
        const product = await Product.findById(req.body.id);
       fs.unlink(`upload/${product.image}`,()=>{})
       await Product.findByIdAndDelete(req.body.id);
       res.json({message:"Product removed successfully"})   
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}