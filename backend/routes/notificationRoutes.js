import express from 'express'
import Product from '../models/Product.js'
import Order from '../models/Order.js'
import Notification from '../models/Notification.js'
import { logActivity } from './ActivityLogRoutes.js'
import { protect } from "../middlewares/protect.js";
const router = express.Router()



// create new notification
const createNotification = async (productId, notificationName) => {
    try{
        if(notificationName !== "expiring soon"){
            await Notification.create({productId, notificationName})
        }else{
            const product = await Product.findById({_id: productId})
            const today = new Date()
            const expiryDate = new Date(product.expirationDate)
            const diffTime = expiryDate - today 
            const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
            await Notification.create({ productId, notificationName, daysLeft: daysLeft});
        }
    }catch(error){
        console.log("Failed to add new Notification: ", error)
    }
}

async function checkStockAndNotify(product, oldStock) {
    const newStock = product.qty;
    console.log("newStock = ", newStock)
    console.log("minLevel = ", product.minLevel)

    // If stock didn't change, don't do anything
    if (oldStock === newStock) return;

    if (newStock <= 0) {
        await Notification.findOneAndUpdate(
            { productId: product._id, type: 'out of stock' },
            {
                productId: product._id,
                type: 'out of stock',
                message: `${product.productName} is out of stock.`,
                createdAt: new Date()
            },
            { upsert: true, new: true }
        );
    } else if (newStock < product.minLevel) {
        await Notification.findOneAndUpdate(
            { productId: product._id, type: 'low in stock' },
            {
                productId: product._id,
                type: 'low in stock',
                message: `${product.productName} is low in stock.`,
                createdAt: new Date()
            },
            { upsert: true, new: true }
        );
        // Remove "out of stock" if it existed
        await Notification.deleteOne({ productId: product._id, type: 'out of stock' });
    }else {
        // Stock is healthy — clean up both low and out-of-stock notifications
        await Notification.deleteMany({
            productId: product._id,
            type: { $in: ['out of stock', 'low in stock'] }
        });
    }
}

    

// fetch and sort data by lastUpdated
router.get("/notifications", async (req, res) => {
    try {
        /*
        const products = await Product.find({
            // $or: [{ lowInStock: true }, { outOfStock: true }, { isExpired: true }, { isExpiringSoon: true }]
            $or: [{ lowInStock: true }, { outOfStock: true }]
        }).sort({ lastUpdated: -1 });

        const updatedProducts = products.map(product => {
            let daysLeftToExpire = null;
            if (product.expirationDate ) {
                const timeDiff = new Date(product.expirationDate) - new Date();
                daysLeftToExpire = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert to days
            }
            return { ...product.toObject(), daysLeftToExpire };
        });

        // Fetch recent orders from client side 
        const orders = await Order.find({ status: "pending" }).sort({ createdAt: -1 });

        // Combine products & orders into one array
        const notifications = [...updatedProducts, ...orders];

        // Sort the combined array by lastUpdated 
        notifications.sort((a, b) => {
            const dateA = a.lastUpdated || a.createdAt; // Use lastUpdated for products, createdAt for orders
            const dateB = b.lastUpdated || b.createdAt;
            return new Date(dateB) - new Date(dateA); 
        });

        res.json(notifications);
        */
        const notifications = await Notification.find().sort({ createdAt: -1 });

        res.json(notifications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

router.delete("/delete-notification/:id", async(req, res) => {
    try{
        const deletedNotification = await Notification.findByIdAndDelete({_id: req.params.id})
        if(!deletedNotification){
            return res.status(404).json({error: "notification not found"})
        }
        console.log("deleted notification: ", deletedNotification)
        res.json({message: "notification deleted successfully", deletedNotification})
    }catch(error){
        console.log("Error: ", error)
        res.status(500).json({error: "Internal server error, failed to delete notification"})
    }
})

export {createNotification}
export {checkStockAndNotify}
export default router