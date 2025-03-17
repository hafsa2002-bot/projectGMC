import express from 'express'
import axios from 'axios'
import cors from 'cors'
import multer from 'multer'
import path from 'path'

const app = express()
const port = 3003
import uri from './mongo_uri.js'
import mongoose from 'mongoose'

import User from './models/User.js'
import Product from './models/Product.js'
import Order from './models/Order.js'
import Activity from './models/Activity.js'
import StoreStock from './models/StoreStock.js'
import Category from './models/Category.js'
import RequestedProduct from './models/RequestedProduct.js'

app.use(cors())
app.use(express.json())
app.use("/uploads", express.static("uploads"))

// connect to MongoDB
mongoose.connect(uri)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("ERROR: ", err))

/*
const newUser = new User({
    userName: "hafsa Barhoud",
    userPassword: "hafsa123",
    role: "admin"
})

await newUser.save()
console.log("User saved: ", newUser)
*/

/*
const newCategory = new Category({
    categoryName: "watches 0"
})
await newCategory.save()
console.log("Category save : ", newCategory)
*/

//configure multer for files uploads 
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage})

async function initializeStoreStock() {
    const existingStock = await StoreStock.findOne({});
    if (!existingStock) {
        await StoreStock.create({ totalItems: 0, totalValue: 0 });
        console.log("Store stock initialized.");
    } else {
        console.log("Store stock already exists.");
    }
}

initializeStoreStock();

// add new item
app.post("/admin/items/add-item", upload.single("productPhoto"), async(req, res) => {
    try{
        let {productName, barcode, qty, minLevel, price, expirationDate, categoryId} = req.body;
        const productPhoto = req.file ? `/uploads/${req.file.filename}` : null;

        if(!categoryId || categoryId === "") categoryId = null;

        console.log({productName, price, qty, barcode, minLevel, productPhoto, expirationDate, categoryId})
        const newItem = new Product({productName, price, barcode, qty, minLevel, productPhoto, expirationDate, categoryId})
        await newItem.save();

        // update Stock Status
        await newItem.updateStockStatus();
        
        // check expiration
        await newItem.checkExpiration()
        
        // update Store Stock
        await StoreStock.updateStoreStock();

        res.json({message: "Product added successfully", productPhoto})
    } catch(error){
        console.log("error: ", error);
        res.status(500).json({message: "Error when adding product"})
    }
})

// list of products
app.get("/admin/items/list", async(req, res) => {
    try{
        const listProducts = await Product.find()
        res.json(listProducts)
    }catch(error){
        console.log("Error: ", error)
        res.status(500).json({error: "Internal server error: get list of products"})
    }
})

// delete item by Id
app.delete("/admin/item/:id", async(req, res) => {
    try{
        const deletedProduct = await Product.findByIdAndDelete({_id : req.params.id})
        if(!deletedProduct){
            return res.status(404).json({error: "Product not found"})
        }
        console.log("deleted product: ", deletedProduct)
        res.status(200).json({message: "Product deleted successfully", deletedProduct})
    }catch(error){
        console.log("error: ", error)
        res.status(500).json({error: "Internal server error: delete item by Id"})
    }
})

// get stock Info
app.get("/admin/stock", async(req, res) => {
    try{
        const stock = await StoreStock.findOne()
        await StoreStock.updateStoreStock();
        res.json(stock)
    }catch(error){
        console.log("error: ", error);
        res.status(500).json({error: "Internal server error: get stock info"})
    }
})

// get products outOfStock
app.get("/admin/items/outOfStock", async(req, res) => {
    try{
        const outOfStock = await Product.find({outOfStock: true})
        res.send(outOfStock)
    }catch(error){
        console.log("Error: ", error)
        res.status(500).json({error: "Iternal server Error: get outOfStock products"})
    }
})

// get products lowInStock
app.get("/admin/items/lowInStock", async(req, res) => {
    try{
        const  lowInStock = await Product.find({lowInStock: true})
        res.send(lowInStock)
    } catch(error){
        console.log("Error: ", error)
        res.status(500).json({error: "Internal server Error: get lowInStock products"})
    }
})

// get products low In Stock Or Out Of stock
app.get("/admin/dashboard/stockLevels", async(req, res) => {
    try{
        const products = await Product.find({$or:[{lowInStock:true}, {outOfStock:true}]})
        res.send(products)
    }catch(error){
        console.log("Error: ", error);
        res.status(500).json({error: "Internal server error: get stock levels"})
    }
})

// get products expired
app.get("/admin/items/expiredItems", async (req, res) => {
    try{
        const expired = await Product.find({isExpired: true})
        res.send(expired)
    }catch(error){
        console.log("Error: ", error)
        res.status(500).json({error: "Internal server error: get expired Items"})
    }
})

// get Product By Id => for product details 
app.get("/admin/items/view/:product_id", async(req, res) => {
    try{
        const productById = await Product.find({_id: req.params.product_id}).populate('categoryId', 'categoryName')
        res.send(productById[0])
    }catch(error){
        console.log("Error: ", error)
        res.status(500).json({error: "Internal server error"})
    }
})

// add category
app.post("/admin/items/addCategory", async(req, res) => {
    try{
        const {categoryName} = req.body;
        const newCategory = new Category({categoryName})
        await newCategory.save()
        await StoreStock.updateStoreStock()
        res.json({message: "category added successfully", categoryName})
    }catch(error){
        console.log("Error: ", error)
        res.status(500).json({error: "Internal server error, Failed to add category"})
    }


})

// get all categories

app.get("/admin/items/categories", async(req, res) => {
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
app.get("/admin/items/categories-with-Products", async (req, res) => {
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
app.get("/admin/items/category/:categoryId", async (req, res) => {
    try{
        const categoryId = new mongoose.Types.ObjectId(req.params.categoryId)
        console.log("Received category id: ", categoryId)
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
        // const categoryWithTotals = category[0]
        
        // const categories = await Category.find({_id: req.params.categoryId})
        console.log("Category found: ", category[0]);

        res.json(category[0])
    }catch(error){
        console.log("Error: ", error)
        res.status(500).json({error: "Internal server Error"})
    }
})

// add new Requested product
app.post("/admin/dashboard/add-requested-product", async(req, res) => {
    try{
        const {reqProductName} = req.body
        const newProduct = new RequestedProduct({reqProductName})
        await newProduct.save()
        res.json({message: "Requested product added successfully", reqProductName})
    }catch(error){
        console.log("Error: ", error)
        res.status(500).json({error: "Internal server error, failed to add requested product"})
    }
})

// get Requested products
app.get("/admin/dashbord/requested-products", async(req, res) => {
    try{
        const requestedProducts = await RequestedProduct.find()
        res.send(requestedProducts)
    }catch(error){
        console.log("Error: ", error)
        res.status(500).json({error: "Internal server Error, failed to get requested products"})
    }
})

// delete requested product by ID
app.delete("/admin/dashboard/delete-requested-product/:id", async(req, res) => {
    try{
        const deletedProduct = await RequestedProduct.findByIdAndDelete({_id: req.params.id})
        if(!deletedProduct){
            return res.status(404).json({error: "product not found"})
        }
        console.log("deleted product: ", deletedProduct)
        res.json({message: "product deleted successfully", deletedProduct})
    }catch(error){
        console.log("Error: ", error)
        res.status(500).json({error: "Internal server error, failed to delete requested product"})
    }
})



app.listen(port, () => console.log(`server running : http://localhost:${port}`))