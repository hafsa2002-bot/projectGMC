import express from 'express'
import Product from '../models/Product.js'
import Order from '../models/Order.js'
import Notification from '../models/Notification.js'

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

export {createNotification}
export default router