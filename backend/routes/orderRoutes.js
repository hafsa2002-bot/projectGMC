import express from 'express'
import StoreStock from '../models/StoreStock.js'
import Product from '../models/Product.js'
import Order from '../models/Order.js'
import { logActivity } from './ActivityLogRoutes.js'
import { protect } from "../middlewares/protect.js";


const router = express.Router()

// add new order: client side
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
        /*
        if(contact.customerMail == "__"){
            logActivity("User name", "Order Added", `${newOrder._id}`)
        }
            */

        // update store stock
        await StoreStock.updateStoreStock();

        res.json({message: "order successfully added", newOrder})
    }catch(error){
        console.log("Error: ", error)
        res.status(500).json({errro: "Internal server error"})
    }
})

//add order 
router.post("/orders/addOrder", protect, async(req, res) => {
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
            logActivity(req.user._id, req.user.name, "Order Added", `${newOrder._id}`)
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

// update order status
router.patch("/orders/update-status/:id", protect, async (req, res) => {
    try{
        const {OrderStatus} = req.body
        const order = await Order.findById(req.params.id)

        if(!order) return res.status(404).json({message: 'Order not found'})

        // if order canceled it means products are restocked but payment status is still the same 
        /*
        if(OrderStatus === "canceled" && order.status !=="canceled"){
            for (const item of order.products){
                const product = await Product.findByIdAndUpdate(item.productId)
                
                if(!product) continue
                product.qty += item.quantity,
                product.itemsSold -= item.quantity
                // await product.updateStockStatus()
            }
                
                ///
                if(updatedProduct.qty === 0){
                    console.log("product was out of stock")
                    await Product.updateOne(
                        {_id: item.productId},
                        {$set: {outOfStock: false}}
                    )
                }
                ///
                order.status = "canceled"
                await order.save()

        }
        */
        if(OrderStatus === "canceled" && order.status !=="canceled"){
            for (const item of order.products){
                const product = await Product.findByIdAndUpdate(item.productId, {
                    $inc: {
                        qty: item.quantity,
                        itemsSold: -item.quantity
                    }
                })
                // in case he was out of stock
                if(product.qty === 0){
                    console.log("product was out of stock")
                    await Product.updateOne(
                        {_id: item.productId},
                        {$set: {outOfStock: false}}
                    )
                }
                //in case he was low in stock 
                if(product.qty + item.quantity > product.minLevel){
                    console.log("product was low in stock")
                    await Product.updateOne(
                        {_id: item.productId},
                        {$set: {lowInStock: false}}
                    )
                }
                //await product.updateStockStatus()
            }
            order.status = "canceled"
            await order.save()

        }
        else {
            order.status = OrderStatus;
            await order.save()
        }
        
        // update store stock
        await StoreStock.updateStoreStock();
        
        //log activity
        await logActivity(req.user._id, req.user.name, "Order status updated", `${order._id}`)
        res.json(order)
    }catch(error){
        console.log("Error: ", error)
        res.status(500).json({error: "Internal server error"})
    }
})

// update payment status 
router.patch("/orders/update-payment-status/:id",protect, async (req, res) => {
    try{
        const {newStatus} = req.body
        const order = await Order.findById(req.params.id)
        if(!order) return res.status(404).json({message: 'Order not found'})
        if(newStatus === "refunded" && order.paymentStatus !== "refunded"){
            order.amountPaid = 0;
            order.rest = 0;
            order.paymentStatus = newStatus
        }else if (newStatus === "paid" && order.paymentStatus !== "paid"){
            order.amountPaid = order.totalAmount;
            order.rest = 0;
            order.paymentStatus = newStatus
        }else{
            // paid -> pending 
            order.paymentStatus = newStatus
        }
        //log activity
        await logActivity(req.user._id, req.user.name, "Payment status updated", `${order._id}, new status: ${newStatus}`)

        await order.save();

        // update store stock
        await StoreStock.updateStoreStock();
        
        res.json(order)
    }catch(error){
        console.log("Error: ", error)
        res.status(500).json({error: "Internal server error"})
    }
})

//delete order
router.delete("/orders/delete/:id",protect , async (req, res) => {
    try{
        const order = await Order.findById({_id: req.params.id})
        if(order.status !== "canceled"){
            for (const item of order.products){
                const product = await Product.findById(item.productId);
                if (!product) {
                    console.log(`Product with ID ${item.productId} not found.`);
                    continue; // Skip this product if not found
                }
                const updatedProduct = await Product.findByIdAndUpdate(item.productId, {
                    $inc: {
                        qty: item.quantity,
                        itemsSold: -item.quantity
                    }
                })
                if(updatedProduct.qty === 0){
                    console.log("product was out of stock")
                    await Product.updateOne(
                        {_id: item.productId},
                        {$set: {outOfStock: false}}
                    )
                }
                //in case he was low in stock 
                if(product.qty + item.quantity > product.minLevel){
                    console.log("product was low in stock")
                    await Product.updateOne(
                        {_id: item.productId},
                        {$set: {lowInStock: false}}
                    )
                }
            }
            await order.save()
            await Order.findByIdAndDelete({_id: req.params.id})
        }
        else await Order.findByIdAndDelete({_id: req.params.id})

        // update store stock
        await StoreStock.updateStoreStock();
        
        //log activity
        await logActivity(req.user._id, req.user.name, "Order deleted", `${order._id}`)
        res.json(order)
    }catch(error){
        console.log("Error: ", error)
        res.status(500).json({error: "Internal server error"})
    }
})

export default router