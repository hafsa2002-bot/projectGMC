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

/********* Products and stock ***********/
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

/********* Categories ***********/
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

// delete category by Id
app.delete("/admin/items/delete-category/:id", async(req, res) => {
    try{
        const deletedCategory = await Category.findByIdAndDelete({_id: req.params.id})
        if(!deletedCategory){
            return res.status(404).json({error: "Category not found"})
        }
        console.log("deleted category: ", deletedCategory)
        res.json({message: "category deleted successfully", deletedCategory})
    }catch(error){
        console.log("Error: ",error)
        res.status(500).json({error: "Internal server error, failed to delete category"})
    }
})

//get products by categoryName
app.get("/category/:categoryName", async(req, res) => {
    try{
        const category = await Category.findOne({categoryName: req.params.categoryName})
        if(!category){
            res.status(404).json({error: "Category not found"})
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


/***** Requested Products *****/
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

/********* Order ***********/
// add new order: client
app.post("/orders/addOnlineOrder", async(req, res) => {
    try{
        const {products, totalAmount, amountPaid} = req.body

        if(!products || products.length == 0){
            return res.status(400).json({error: "Order must contain at least one product"})
        }
        
        const rest = totalAmount - amountPaid;
        let paymentStatus = "pending"
        if(amountPaid >= totalAmount){
            paymentStatus = "paid"
        }else if(amountPaid > 0){
            paymentStatus = "partially_paid"
        }

        for(const item of products){
            const product = await Product.findById({_id: item.productId})
            if(!product){
                return res.status(400).json({error: "Product not found"})
            }
            if (item.quantity > product.qty){
                return res.status(400).json({error: `Not enough stock for product: ${item.productId}`})
            }
            await Product.updateOne(
                {_id: item.productId},
                {$inc: {qty: -item.quantity}}
            )
            await product.save()

            console.log("product quantity equal:", product.qty)
            console.log("order equal:", item.quantity)

            if(product.qty == 0){
                console.log("sold out ")

                await Product.updateOne(
                    {_id: item.productId},
                    {$set: {outOfStock: true}}
                )
            }
        }

        const newOrder = new Order ({products, totalAmount, amountPaid, rest, paymentStatus})
        await newOrder.save()
        res.json({message: "order successfully added", newOrder})
    }catch(error){
        console.log("Error: ", error)
        res.status(500).json({errro: "Internal server error"})
    }
})


app.listen(port, () => console.log(`server running : http://localhost:${port}`))