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
        const {productName, barcode, qty, minLevel, price} = req.body;
        const productPhoto = req.file ? `/uploads/${req.file.filename}` : null;
    
        console.log({productName, price, qty, barcode, minLevel, productPhoto})
        const newItem = new Product({productName, price, barcode, qty, minLevel, productPhoto})
        await newItem.save();

        // update Store Stock
        await StoreStock.updateStoreStock();
        
        res.json({message: "Product added successfully", productPhoto})
    } catch(error){
        console.log("error: ", error);
        res.status(500).json({message: "Error adding product"})
    }
})

app.get("/admin/items/list", async(req, res) => {
    try{
        const listProducts = await Product.find()
        res.json(listProducts)
    }catch(error){
        console.log("Error: ", error)
        res.status(500).json({error: "Internal server error"})
    }
})


app.listen(port, () => console.log(`server running : http://localhost:${port}`))