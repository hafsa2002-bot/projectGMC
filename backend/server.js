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
        const {productName, barcode, qty, minLevel, price, expirationDate} = req.body;
        const productPhoto = req.file ? `/uploads/${req.file.filename}` : null;
    
        console.log({productName, price, qty, barcode, minLevel, productPhoto, expirationDate})
        const newItem = new Product({productName, price, barcode, qty, minLevel, productPhoto, expirationDate})
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
        res.status(500).json({message: "Error adding product"})
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

// stock Info
app.get("/admin/stock", async(req, res) => {
    try{
        const stock = await StoreStock.findOne()
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

// get Product By Id
app.get("/admin/items/view/:product_id", async(req, res) => {
    try{
        const productById = await Product.find({_id: req.params.product_id}).populate('categoryId', 'categoryName')
        res.send(productById[0])
    }catch(error){
        console.log("Error: ", error)
        res.status(500).json({error: "Internal server error"})
    }
})

app.listen(port, () => console.log(`server running : http://localhost:${port}`))