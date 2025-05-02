import express from 'express'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import Product from '../models/Product.js'
import StoreStock from '../models/StoreStock.js'
import { logActivity } from './ActivityLogRoutes.js'
import { protect } from "../middlewares/protect.js";
import {updateExpiredStatus} from '../utils/updateExpirations.js'

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

router.post("/items/add-item", protect, upload.single("productPhoto"), async (req, res) => {
    try {
        let {
            productName,
            barcode,
            qty,
            itemsSold,
            minLevel,
            price,
            expirationDate,
            categoryId,
            batches,
        } = req.body;

        const productPhoto = req.file ? `/uploads/${req.file.filename}` : null;
        const parsedBatches = batches ? JSON.parse(batches) : [];

        if (!categoryId || categoryId === "") categoryId = null;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let expiredQty = 0;
        let expiringSoonQty = 0;

        // Add expiration flags to batches and compute expiration quantities
        for (const batch of parsedBatches) {
            const expDate = new Date(batch.expirationDate);
            expDate.setHours(0, 0, 0, 0);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const qty = Number(batch.qty); // make sure it's a number
            if (isNaN(qty)) continue;

            if (expDate <= today) {
                batch.isExpired = true;
                batch.isExpiringSoon = false;
                expiredQty += qty;
            } else {
                const diffDays = (expDate - today) / (1000 * 60 * 60 * 24);
                if (diffDays <= 7) {
                    batch.isExpired = false;
                    batch.isExpiringSoon = true;
                    expiringSoonQty += qty;
                } else {
                    batch.isExpired = false;
                    batch.isExpiringSoon = false;
                }
            }
        }

        const newItem = new Product({
            productName,
            price,
            barcode,
            qty,
            itemsSold,
            minLevel,
            productPhoto,
            expirationDate,
            categoryId,
            userId: req.user._id,
            batches: parsedBatches,
            expiredQty,
            expiringSoonQty
        });

        await newItem.save();

        await newItem.updateStockStatus();
        await StoreStock.updateStoreStock();

        await logActivity(req.user._id, req.user.name, "Product Added", `${productName}`);

        res.json({ message: "Product added successfully", productPhoto });
    } catch (error) {
        console.log("error: ", error);
        res.status(500).json({ message: "Error when adding product" });
    }
});


// list of products
/*
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
        
        // const products = await Product.find({ 
        //     isExpired: false,
        //     isExpiringSoon: false 
        // });
        // for (const product of products) {
        //     await product.updateExpirationStatus();
        // }
        

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
})*/
/*
router.get("/items/list", async (req, res) => {
    try {
        const products = await Product.find();

        // Set today using UTC
        const now = new Date();
        const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

        for (const product of products) {
            let expiredQty = 0;
            let expiringSoonQty = 0;
            let upcomingExpirations = [];
            let expiredExpirations = [];

            for (const batch of product.batches || []) {
                const rawExpDate = new Date(batch.expirationDate);
                const expDate = new Date(Date.UTC(
                    rawExpDate.getUTCFullYear(),
                    rawExpDate.getUTCMonth(),
                    rawExpDate.getUTCDate()
                ));

                if (expDate <= today) {
                    batch.isExpired = true;
                    batch.isExpiringSoon = false;
                    expiredQty += batch.qty;
                    expiredExpirations.push(expDate.getTime());
                } else {
                    const diffDays = (expDate - today) / (1000 * 60 * 60 * 24);
                    if (diffDays <= 7) {
                        batch.isExpired = false;
                        batch.isExpiringSoon = true;
                        expiringSoonQty += batch.qty;
                    } else {
                        batch.isExpired = false;
                        batch.isExpiringSoon = false;
                    }
                    upcomingExpirations.push(expDate.getTime());
                }
            }

            let earliestExpiration = null;
            if (upcomingExpirations.length > 0) {
                earliestExpiration = new Date(Math.min(...upcomingExpirations));
            } else if (expiredExpirations.length > 0) {
                earliestExpiration = new Date(Math.max(...expiredExpirations));
            }

            // Save values to the database
            product.expiredQty = expiredQty;
            product.expiringSoonQty = expiringSoonQty;
            product.earliestExpiration = earliestExpiration;
            await product.save();
        }

        // Re-fetch the updated products
        const updatedProducts = await Product.find();
        res.json(updatedProducts);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error: get list of products" });
    }
});
*/

router.get("/items/list", async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  

// delete item by Id
router.delete("/item/:id", protect, async(req, res) => {
    try{
        const deletedProduct = await Product.findByIdAndDelete({_id : req.params.id})
        if(!deletedProduct){
            return res.status(404).json({error: "Product not found"})
        }
        console.log("deleted product: ", deletedProduct)
        
        // log activity
        await logActivity(req.user._id, req.user.name, "Product deleted", `${deletedProduct.productName}`)
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

// update quantity 
router.patch("/items/update/:id", protect, async(req, res) => {
    try{  
        // to get the product name for activty log  
        const produit = await Product.findById({_id: req.params.id})
        const product = await Product.findByIdAndUpdate(req.params.id, {qty: req.body.newQty}, {new: true})

        //log activity
        await logActivity(req.user._id, req.user.name, "Stock updated", produit.productName)

        // update Store Stock
        await StoreStock.updateStoreStock();

        // update product status 
        await product.updateStockStatus();

        res.json(product)
    }catch(error){
        console.log("Error: ", error)
        res.status(500).json({error: "Internal server error"})
    }
})

// update a product
router.patch("/items/updateProduct/:id", protect, upload.single("updatedProductPhoto"), async(req, res) => {
    try{
        const updateFields = {
            productName: req.body.productName,
            price: req.body.price,
            barcode: req.body.barcode,
            minLevel: req.body.minLevel,
            expirationDate: req.body.expirationDate,
            categoryId: req.body.updatedCategoryId || null
        };

        if (req.file) {
            updateFields.productPhoto = `/uploads/${req.file.filename}`;
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            updateFields,
            { new: true }
        );

        let parsedBatches = [];
        if (req.body.batches) {
            try {
                parsedBatches = JSON.parse(req.body.batches);
            } catch (err) {
                return res.status(400).json({ error: "Invalid batches format" });
            }
        }

        // Save parsed batches depending on your setup
        if (parsedBatches.length > 0) {
            product.batches = parsedBatches; // only if embedded!
            await product.save();
        }
        
        //log activity
        await logActivity(req.user._id, req.user.name, "Product updated", req.body.productName)

        // update Store Stock
        await StoreStock.updateStoreStock();

        // update product status 
        await product.updateStockStatus();
        await updateExpiredStatus();
        res.json(product)
    }catch(error){
        console.log("Error: ", error)
        res.status(500).json({error: "Internal server error"})
    }
})

export default router
