import express from 'express'
import StoreStock from '../models/StoreStock.js'
import Product from '../models/Product.js'

const router = express.Router()

async function initializeStoreStock() {
    const existingStock = await StoreStock.findOne({});
    if (!existingStock) {
        await StoreStock.create({ totalItems: 0, totalValue: 0, ttalUnpaid: 0, totalIncome: 0 });
        console.log("Store stock initialized.");
    } else {
        console.log("Store stock already exists.");
    }
}

initializeStoreStock();

// get stock Info
router.get("/admin/stock", async(req, res) => {
    try{
        const stock = await StoreStock.findOne()
        await StoreStock.updateStoreStock();
        res.json(stock)
    }catch(error){
        console.log("error: ", error);
        res.status(500).json({error: "Internal server error: get stock info"})
    }
})

// get products expired
router.get("/admin/items/expiredItems", async (req, res) => {
    try{
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

        res.send(expired)
    }catch(error){
        console.log("Error: ", error)
        res.status(500).json({error: "Internal server error: get expired Items"})
    }
})


// get products outOfStock
router.get("/admin/items/outOfStock", async(req, res) => {
    try{
        await Product.updateMany(
            {qty:0, $or:[{outOfStock: false}, {lowInStock: true}]},
            {$set:{outOfStock: true, lowInStock: false}}
        )
        const outOfStock = await Product.find({outOfStock: true})
        res.send(outOfStock)
    }catch(error){
        console.log("Error: ", error)
        res.status(500).json({error: "Iternal server Error: get outOfStock products"})
    }
})

// get products lowInStock
router.get("/admin/items/lowInStock", async(req, res) => {
    try{
        await Product.updateMany(
            {qty:0, $or:[{outOfStock: false}, {lowInStock: true}]},
            {$set:{outOfStock: true, lowInStock: false}}
        )
        await Product.updateMany(
            {$expr: { $lt: ["$qty", "$minLevel"] },lowInStock: false, outOfStock: false },
            {$set:{lowInStock: true}}
        )
        const  lowInStock = await Product.find({lowInStock: true})
        res.send(lowInStock)
    } catch(error){
        console.log("Error: ", error)
        res.status(500).json({error: "Internal server Error: get lowInStock products"})
    }
})

// get products low In Stock Or Out Of stock
router.get("/admin/dashboard/stockLevels", async(req, res) => {
    try{
        const products = await Product.find({$or:[{lowInStock:true}, {outOfStock:true}]})
        res.send(products)
    }catch(error){
        console.log("Error: ", error);
        res.status(500).json({error: "Internal server error: get stock levels"})
    }
})

// fetch and sort data by lastUpdated
router.get("/stockLevel", async (req, res) => {
    try{
        const products = await Product.find({
            $or: [{lowInStock: true}, { outOfStock: true }]
        }).sort({lastUpdated: -1})
        res.json(products)
    }catch(error){
        console.log("Error: ", error)
        res.status(500).json({error: "stock level error"})
    }
})

export default router