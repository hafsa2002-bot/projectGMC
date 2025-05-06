import express from 'express'
import StoreStock from '../models/StoreStock.js'
import Product from '../models/Product.js'
import Order from '../models/Order.js'
import Notification from '../models/Notification.js'
import { logActivity } from './ActivityLogRoutes.js'
import { protect } from "../middlewares/protect.js";
import { checkStockAndNotify } from './notificationRoutes.js';


const router = express.Router()

// add new order: client side
  router.post("/orders/addOnlineOrder", async (req, res) => {
    try {
      const { contact, shipping, products, totalAmount, amountPaid, status } = req.body;
  
      if (!products || products.length === 0) {
        return res.status(400).json({ error: "Order must contain at least one product" });
      }
  
      const rest = totalAmount - amountPaid;
      let paymentStatus = amountPaid >= totalAmount ? "paid" : "pending";
  
      const updatedProducts = [];
  
      for (const item of products) {
        const product = await Product.findById(item.productId);
        if (!product) {
          return res.status(400).json({ error: "Product not found" });
        }
  
        if (product.qty - product.expiredQty <= 0) {
          return res.status(400).json({ error: `Product is expired or fully out of stock: ${item.name}` });
        }
  
        if (item.quantity > product.qty - product.expiredQty) {
          return res.status(400).json({ error: `Not enough stock for product: ${item.name}` });
        }
  
        const oldStock = product.qty;
  
        // Deduct stock from batches in order (FIFO)
        let batchesUsed = [];

        if (product.batches && product.batches.length > 0) {
          // Use batch logic
          let remainingQty = item.quantity;
  
          // Filter out expired batches
const validBatches = product.batches.filter(batch => {
    if (batch.qty <= 0) return false;
    if (!batch.expirationDate) return true; // Allow null expiration
    return new Date(batch.expirationDate) >= new Date(); // not expired
  });
  
  // Sort FEFO: earliest expiration first, nulls last
  const sortedBatches = validBatches.sort((a, b) => {
    const aDate = a.expirationDate ? new Date(a.expirationDate) : new Date(8640000000000000);
    const bDate = b.expirationDate ? new Date(b.expirationDate) : new Date(8640000000000000);
    return aDate - bDate;
  });
  
  for (const batch of sortedBatches) {
    if (remainingQty <= 0) break;
  
    const usedQty = Math.min(batch.qty, remainingQty);
    batch.qty -= usedQty;
    remainingQty -= usedQty;
  
    batchesUsed.push({
      expirationDate: batch.expirationDate,
      quantityUsed: usedQty
    });
  }
  if (remainingQty > 0) {
    return res.status(400).json({ error: `Not enough valid batches for product: ${item.name}` });
    }
    /*
          const totalValidQty = sortedBatches.reduce((sum, batch) => sum + batch.qty, 0);
          if (totalValidQty < item.quantity) {
            return res.status(400).json({ error: `Not enough valid batches for product: ${item.name}` });
          }
          */
        } else {
          // No batches — allow if total non-expired stock is enough
        if (item.quantity > product.qty - product.expiredQty) {
          return res.status(400).json({ error: `Not enough stock for product: ${item.name}` });
        }
      }
  
  
        // Update product stock and itemsSold
        product.qty -= item.quantity;
        product.itemsSold += item.quantity;
  
        // Mark as out of stock or low in stock
        if (product.qty <= 0) {
          product.outOfStock = true;
        } else if (product.qty < product.minLevel) {
          product.lowInStock = true;
        }
  
        await product.save();
        await checkStockAndNotify(product, oldStock);
  
        // Add batchesUsed to the item for order tracking
        updatedProducts.push({
          ...item,
          batchesUsed
        });
      }
  
      const newOrder = new Order({
        contact,
        shipping,
        products: updatedProducts,
        totalAmount,
        amountPaid,
        rest,
        paymentStatus,
        status
      });
  
      await newOrder.save();
      console.log("New order:", newOrder);
  
      await Notification.create({
        type: "new order received",
        message: `New order received from ${shipping?.lastName || ""} ${shipping?.firstName || "a client"}`,
        orderId: newOrder._id,
        createdAt: new Date()
      });
  
      await StoreStock.updateStoreStock();
  
      res.json({ message: "Order successfully added", newOrder });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  

//add order 
  router.post("/orders/addOrder", protect, async (req, res) => {
    try {
      const { shipping, products, totalAmount, amountPaid, status } = req.body;
      const userId = req.user._id;
  
      if (!products || products.length === 0) {
        return res.status(400).json({ error: "Order must contain at least one product" });
      }
  
      const rest = totalAmount - amountPaid;
      let paymentStatus = amountPaid >= totalAmount ? "paid" : "pending";
  
      // Create an array to hold products with their batch information
      const orderProducts = [];
  
      for (const item of products) {
        const product = await Product.findById(item.productId);
        if (!product) continue;
        const oldStock = product.qty;
  
        // STEP 1: Decrease qty from product-level total (item is being sold)
        product.qty -= item.quantity;
        product.itemsSold += item.quantity;
  
        // STEP 2: Distribute quantity to batches based on expiration date
        let quantityToDistribute = item.quantity;
        const batchesUsed = []; // Store the batch information used for this order
  
        // Filter out expired batches and sort by expiration date (soon to expire first)
        const validBatches = product.batches.filter(batch => !batch.isExpired);
        const sortedBatches = validBatches.sort((a, b) => new Date(a.expirationDate) - new Date(b.expirationDate));
  
        for (const batch of sortedBatches) {
          if (quantityToDistribute <= 0) break;  // Exit if all quantity has been distributed
  
          // If batch has enough stock, reduce the batch qty accordingly
          if (batch.qty >= quantityToDistribute) {
            batch.qty -= quantityToDistribute;
            batchesUsed.push({ expirationDate: batch.expirationDate, quantityUsed: quantityToDistribute });
            quantityToDistribute = 0;  // All quantity has been allocated
          } else {
            // Otherwise, reduce the batch qty and continue to the next batch
            batchesUsed.push({ expirationDate: batch.expirationDate, quantityUsed: batch.qty });
            quantityToDistribute -= batch.qty;
            batch.qty = 0;  // This batch is exhausted
          }
        }
  
        // STEP 3: Update product flags based on new stock levels
        if (product.qty === 0) {
          product.outOfStock = true;  // Mark as out of stock if the qty is zero
        }
        if (product.qty < product.minLevel) {
          product.lowInStock = true;  // Mark as low in stock if it drops below minLevel
        }
  
        await product.save();
        await checkStockAndNotify(product, oldStock);
  
        // Add to final order product list
        orderProducts.push({
          productId: item.productId,
          name: product.productName,
          quantity: item.quantity,
          price: product.price,
          batchesUsed,  // Store batches used for cancellation later
        });
      }
  
      // Create the new order with the products
      const newOrder = new Order({
        userId,
        shipping,
        products: orderProducts,
        totalAmount,
        amountPaid,
        rest,
        paymentStatus,
        status
      });
  
      await newOrder.save();
  
      logActivity(req.user._id, req.user.name, "Order Added", `${newOrder._id}`);
  
      await StoreStock.updateStoreStock();
  
      res.json({ message: "Order successfully added", newOrder });
  
    } catch (error) {
      console.error("Error: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  


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
router.get("/orders/:id", protect, async (req, res) => {
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

//update order status
  router.patch("/orders/update-status/:id", protect, async (req, res) => {
    try {
      const { OrderStatus } = req.body;
      const order = await Order.findById(req.params.id);
  
      if (!order) return res.status(404).json({ message: 'Order not found' });
  
      if (OrderStatus === "canceled" && order.status !== "canceled") {
        // Restore stock for each product in the order
        for (const item of order.products) {
          const product = await Product.findById(item.productId);
          if (!product) continue;
  
          const oldStock = product.qty;
  
          // Restore product stock and update itemsSold
          product.qty += item.quantity;
          product.itemsSold -= item.quantity;
  
          // Restore batches used in the order
          if (item.batchesUsed && item.batchesUsed.length > 0) {
            for (const batchInfo of item.batchesUsed) {
              // Find the corresponding batch for this product by matching expiration date

              /*
              const batch = product.batches.find(b => b.expirationDate.toString() === batchInfo.expirationDate.toString());
              */
              const batch = product.batches.find(b => 
                b.expirationDate && batchInfo.expirationDate && 
                b.expirationDate.toString() === batchInfo.expirationDate.toString()
              );

              if (batch) {
                // Restore the batch quantity
                batch.qty += batchInfo.quantityUsed;
  
                // If you want to keep track of the expired batches, make sure the expired flag stays intact
                // but update the qty as per the returned order quantity
              }
            }
          }
  
          // Reset flags based on the new stock quantity
          if (oldStock === 0 && product.qty > 0) {
            product.outOfStock = false;
            console.log("Product was out of stock, now restocked.");
          }
  
          if (oldStock < product.minLevel && product.qty >= product.minLevel) {
            product.lowInStock = false;
            console.log("Product was low in stock, now sufficient.");
          }
  
          // Save the updated product stock and batches
          await product.save();
  
          // Check stock levels and notify if necessary
          await checkStockAndNotify(product, oldStock);
        }
  
        // Update order status to canceled
        order.status = "canceled";
        await order.save();
  
        // Log the activity of canceling the order
        await logActivity(req.user._id, req.user.name, "Order canceled", `${order._id}`);
      } else {
        order.status = OrderStatus;
        await order.save();
        await logActivity(req.user._id, req.user.name, "Order status updated", `${order._id}, new status: ${OrderStatus}`);
      }
  
      // Update store stock
      await StoreStock.updateStoreStock();
  
      res.json(order);
    } catch (error) {
      console.log("Error: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  

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


router.delete("/orders/delete/:id", protect, async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).json({ message: "Order not found" });
  
      // If the order is not canceled, restore the stock
      if (order.status !== "canceled") {
        for (const item of order.products) {
          const product = await Product.findById(item.productId);
          if (!product) {
            console.log(`Product with ID ${item.productId} not found.`);
            continue;
          }
  
          const oldStock = product.qty;
  
          // Restore product stock and update itemsSold
          product.qty += item.quantity;
          product.itemsSold -= item.quantity;
  
          // Restore batches used
          if (item.batchesUsed && item.batchesUsed.length > 0) {
            for (const batchInfo of item.batchesUsed) {
              const batch = product.batches.find(
                b => b.expirationDate.toString() === batchInfo.expirationDate.toString()
              );
              if (batch) {
                batch.qty += batchInfo.quantityUsed;
              }
            }
          }
  
          // Reset outOfStock and lowInStock flags if needed
          if (oldStock === 0 && product.qty > 0) {
            product.outOfStock = false;
          }
          if (oldStock < product.minLevel && product.qty >= product.minLevel) {
            product.lowInStock = false;
          }
  
          await product.save();
  
          // Check and notify if needed
          await checkStockAndNotify(product, oldStock);
        }
      }
  
      // Delete the order
      await Order.findByIdAndDelete(req.params.id);
  
      // Update store stock
      await StoreStock.updateStoreStock();
  
      // Log activity
      await logActivity(req.user._id, req.user.name, "Order deleted", `${order._id}`);
  
      res.json(order);
    } catch (error) {
      console.log("Error: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  

export default router