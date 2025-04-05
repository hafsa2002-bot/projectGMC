import express from 'express'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import Product from '../models/Product.js'
import StoreStock from '../models/StoreStock.js'
import { logActivity } from './ActivityLogRoutes.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router()

//configure multer for files uploads 
const storage = multer.diskStorage({
    destination: path.join(__dirname, "../uploads"),
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage})

// add new item
router.post("/items/add-item", upload.single("productPhoto"), async(req, res) => {
    try{
        let {productName, barcode, qty, itemsSold, minLevel, price, expirationDate, categoryId} = req.body;
        const productPhoto = req.file ? `/uploads/${req.file.filename}` : null;
        
        if(!categoryId || categoryId === "") categoryId = null;
        
        // console.log({productName, price, qty, itemsSold, barcode, minLevel, productPhoto, expirationDate, categoryId})
        const newItem = new Product({productName, price, barcode, qty, itemsSold, minLevel, productPhoto, expirationDate, categoryId})
        await newItem.save();
        
        // update Stock Status
        await newItem.updateStockStatus();
        
        // check expiration
        await newItem.updateExpirationStatus()
        
        // update Store Stock
        await StoreStock.updateStoreStock();
        
        // log activity
        await logActivity("User name", "Product Added", `${productName}`)
        
        res.json({message: "Product added successfully", productPhoto})
    } catch(error){
        console.log("error: ", error);
        res.status(500).json({message: "Error when adding product"})
    }
})

// list of products
router.get("/items/list", async(req, res) => {
    try{
        const listProducts = await Product.find()

        // Update expiration status only if not already marked
        for (let product of listProducts) {
            if (!product.isExpiringSoon && product.expirationDate) {
                await product.updateExpirationStatus();
            }
        }

        //update the expiration status
        /*
        const products = await Product.find({ 
            isExpired: false,
            isExpiringSoon: false 
        });
        for (const product of products) {
            await product.updateExpirationStatus();
        }
        */

        //find expired products
        const expired = await Product.find({ expirationDate: { $lte: new Date() } });

        // Go through each expired product and update only if needed
        for (const product of expired) {
            // Only update if the product was not already marked as expired
            if (!product.isExpired) {
                product.isExpired = true;
                product.lastUpdated = new Date();  // Update lastUpdated when expired

                // Save the updated product
                await product.save();
            }
        }



        res.send(listProducts)
    }catch(error){
        console.log("Error: ", error)
        res.status(500).json({error: "Internal server error: get list of products"})
    }
})

// delete item by Id
router.delete("/item/:id", async(req, res) => {
    try{
        const deletedProduct = await Product.findByIdAndDelete({_id : req.params.id})
        if(!deletedProduct){
            return res.status(404).json({error: "Product not found"})
        }
        console.log("deleted product: ", deletedProduct)
        
        // log activity
        await logActivity("User name", "Product deleted", `${deletedProduct.productName}`)
        res.status(200).json({message: "Product deleted successfully", deletedProduct})
    }catch(error){
        console.log("error: ", error)
        res.status(500).json({error: "Internal server error: delete item by Id"})
    }
})


// get Product By Id 
router.get("/items/view/:product_id", async(req, res) => {
    try{
        const productById = await Product.find({_id: req.params.product_id}).populate('categoryId', 'categoryName')
        res.send(productById[0])
    }catch(error){
        console.log("Error: ", error)
        res.status(500).json({error: "Internal server error"})
    }
})

// get products from low to high price
router.get("/items/sort-from-low-to-high", async (req, res) => {
    try{
        const products = await Product.find().sort({price: 1})
        res.send(products)
    }catch(error){
        console.log("error fetxhing low to high products", error)
        res.status(500).json({error: "Internal server error"})
    }
})

// get products from high to low price
router.get("/items/sort-from-high-to-low", async (req, res) => {
    try{
        const products = await Product.find().sort({price: -1})
        res.send(products)
    }catch(error){
        console.log("error fetching high to low products", error)
        res.status(500).json({error: "Internal server error"})
    }
})

// get best selling products
router.get("/items/sort-best-selling", async (req, res) => {
    try{
        const products = await Product.find().sort({itemsSold: -1})
        res.send(products)
    }catch(error){
        console.log("error fetching best selling products", error)
        res.status(500).json({error: "Internal server error"})
    }
})

// get best selling products
router.get("/items/sort-top-earning-products", async (req, res) => {
    try{
        const products = await Product.aggregate([
            {
                $addFields: {
                    earnings: { $multiply: ["$price", "$itemsSold"] }
                }
            },
            {
                $sort: { earnings: -1 } // Sort by earnings descending
            }
        ]);
        res.send(products)
    }catch(error){
        console.log("error fetching best selling products", error)
        res.status(500).json({error: "Internal server error"})
    }
})

export default router
