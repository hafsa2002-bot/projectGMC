import express from 'express'
import StoreStock from '../models/StoreStock.js'
import Product from '../models/Product.js'
import Order from '../models/Order.js'
import { logActivity } from './ActivityLogRoutes.js'


const router = express.Router()

// add new order: client
router.post("/orders/addOnlineOrder", async(req, res) => {
    try{
        const {contact, shipping, products, totalAmount, amountPaid, status} = req.body

        if(!products || products.length == 0){
            return res.status(400).json({error: "Order must contain at least one product"})
        }
        
        const rest = totalAmount - amountPaid;
        let paymentStatus = "pending"
        if(amountPaid >= totalAmount){
            paymentStatus = "paid"
        }else if(amountPaid > 0 && rest > 0){
            paymentStatus = "pending"
        }else{
            paymentStatus  = "pending"
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
            await Product.updateOne(
                {_id: item.productId},
                {$inc: {itemsSold: item.quantity}}
            )
            // await product.save()

            console.log("product quantity equal:", product.qty)
            console.log("order equal:", item.quantity)

            if(product.qty == item.quantity){
                console.log("sold out ")

                await Product.updateOne(
                    {_id: item.productId},
                    {$set: {outOfStock: true}}
                )
            }
            else if(product.qty - item.quantity < product.minLevel ){
                console.log("it's low in stock ")
                await Product.updateOne(
                    {_id: item.productId},
                    {$set: {lowInStock: true}}
                )
            }
            await product.updateStockStatus();
        }

        const newOrder = new Order ({contact, shipping, products, totalAmount, amountPaid, rest, paymentStatus, status})
        await newOrder.save()
        console.log("new order: ", newOrder)

        //log activity:
        if(contact.customerMail == "__"){
            logActivity("User name", "Order Added", `${newOrder._id}`)
        }

        // update store stock
        await StoreStock.updateStoreStock();

        res.json({message: "order successfully added", newOrder})
    }catch(error){
        console.log("Error: ", error)
        res.status(500).json({errro: "Internal server error"})
    }
})

// get orders
router.get("/orders/getOnlineOrders", async (req, res) => {
    try{
        const orders = await Order.find()
        res.send(orders)
    }catch(error){
        console.log("Error: ", error)
        res.status(500).json({error: "Internal server error"})
    }
}) 


//get order by Id
router.get("/orders/:id", async (req, res) => {
    try{
        const orderById = await Order.find({_id: req.params.id})
        res.send(orderById[0])
    }catch(error){
        console.log("Error: ", error)
        res.status(500).json({error:"Internal server error"})
    }
})

// get orders on process
router.get("/orders/status/on-process", async  (req, res) => {
    try{
        const orders = await Order.find({status: "pending"})
        res.json(orders)
    }catch(error){
        console.log("Error: ", error)
        res.status(500).json({error: "Internal server error"})
    }
})

// get orders done (status = done) not payment status
router.get("/orders/status/done", async  (req, res) => {
    try{
        const orders = await Order.find({status: "done"})
        res.json(orders)
    }catch(error){
        console.log("Error: ", error)
        res.status(500).json({error: "Internal server error"})
    }
})

// get unpaid orders
router.get("/orders/payment-status/pending", async  (req, res) => {
    try{
        const orders = await Order.find({paymentStatus: "pending"})
        res.json(orders)
    }catch(error){
        console.log("Error: ", error)
        res.status(500).json({error: "Internal server error"})
    }
})

export default router