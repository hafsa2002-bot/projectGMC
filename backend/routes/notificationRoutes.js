import express from 'express'
import Product from '../models/Product.js'
import Order from '../models/Order.js'

const router = express.Router()

// fetch and sort data by lastUpdated
router.get("/notifications", async (req, res) => {
    try {
        const products = await Product.find({
            $or: [{ lowInStock: true }, { outOfStock: true }, { isExpired: true }, { isExpiringSoon: true }]
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
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

export default router