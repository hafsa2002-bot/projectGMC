import express from 'express'
import mongoose from 'mongoose'
import Category from '../models/Category.js'
import StoreStock from '../models/StoreStock.js'
import Product from '../models/Product.js'
import { logActivity } from './ActivityLogRoutes.js'
import { protect } from "../middlewares/protect.js";

const router = express.Router()

// add category
router.post("/admin/items/addCategory", protect, async(req, res) => {
    try{
        const {categoryName} = req.body;
        const newCategory = new Category({categoryName, userId: req.user._id})
        await newCategory.save()
        await StoreStock.updateStoreStock()

         // log activity
        await logActivity(req.user._id, req.user.name, "Category added", `${newCategory.categoryName}`)
        res.json({message: "category added successfully", categoryName})
    }catch(error){
        console.log("Error: ", error)
        res.status(500).json({error: "Internal server error, Failed to add category"})
    }
})

// get all categories
router.get("/admin/items/categories", async(req, res) => {
    try{
        const categories = await Category.find()
        // console.log("categories: ", categories)
        res.send(categories)
    }catch(error){
        console.log("Error: ", error)
        res.status(500).json({error: "Internal server Error, failed to get categories"})
    }
})

// get categories with products 
router.get("/admin/items/categories-with-Products", async (req, res) => {
    try{
        const categories = await Category.aggregate([
            {
                $lookup:{
                    from: "products",
                    localField: "_id",
                    foreignField: "categoryId",
                    as: "products"
                }
            }
        ]);
        
        const categoriesWithTotalValue = categories.map(category => {
            const totalValue = category.products.reduce((acc, product) => acc + product.price*product.qty, 0)
            const totalQty = category.products.reduce((acc, product) => acc + product.qty, 0)
            return {...category, totalValue, totalQty}
        })

        res.json(categoriesWithTotalValue);
    }catch(error){
        console.log("Error fetching categories with products: ", error)
        res.status(500).json({error: "Internal server error"})
    }
})

// get category By Id
router.get("/admin/items/category/:categoryId", async (req, res) => {
    try{
        const categoryId = new mongoose.Types.ObjectId(req.params.categoryId)
        //console.log("Received category id: ", categoryId)
        const category = await Category.aggregate([
            {
                $match: {
                    _id: categoryId
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "categoryId",
                    as: "products"
                }
            }
        ])
        if(category.length === 0){
            console.log("Category not found")
            return res.status(404).json({message: "Category not found"})
        }
        // console.log("Category found: ", category[0]);
        res.json(category[0])
    }catch(error){
        console.log("Error: ", error)
        res.status(500).json({error: "Internal server Error"})
    }
})

// update category name
router.patch("/update/category/:id", protect,  async (req, res) => {
    try{
        const oldCategory = await Category.findById({_id: req.params.id})
        const category = await Category.findByIdAndUpdate(req.params.id, { categoryName: req.body.categoryName }, {new: true})

        // log activity
        await logActivity(req.user._id, req.user.name, "Category updated", `${oldCategory.categoryName}`)
        if(!category) return res.status(404).json({message: 'Product not found'})
        res.json(category)
    }catch(error){
        res.status(500).json({error: error.message})
    }
})


// delete category by Id
router.delete("/admin/items/delete-category/:id", protect, async(req, res) => {
    try{
        const deletedCategory = await Category.findByIdAndDelete({_id: req.params.id})
        if(!deletedCategory){
            return res.status(404).json({error: "Category not found"})
        }
        console.log("deleted category: ", deletedCategory)
        // supprimer les produits de la categorie
        const deletedProducts = await Product.deleteMany({ categoryId: req.params.id });        
        console.log("deleted products from this category : ", deletedProducts)

         // log activity
        await logActivity(req.user._id, req.user.name, "Category deleted", `${deletedCategory.categoryName}`)
        res.json({message: "category deleted successfully", deletedCategory})
    }catch(error){
        console.log("Error: ",error)
        res.status(500).json({error: "Internal server error, failed to delete category"})
    }
})

//get products by categoryName
router.get("/category/:categoryName", async(req, res) => {
    try{
        const category = await Category.findOne({categoryName: req.params.categoryName})
        if(!category){
            return res.status(404).json({error: "Category not found"})
        }
        // console.log("category id: ", category._id)
        const productsByCategory = await Product.find({categoryId: category._id})
        // console.log("Products by category name:", productsByCategory)
        res.json({
            categoryName: category.categoryName,
            products: productsByCategory
            })
    }catch(error){
        console.log("Error: ", error);
        res.status(500).json({error: "Internal server error"})
    }
})

export default router