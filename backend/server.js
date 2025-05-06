import express from 'express'
import cors from 'cors'
import productRoutes from './routes/productRoutes.js'
import ActivityLogRoutes from './routes/ActivityLogRoutes.js'
import stockRoutes from './routes/stockRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import requestedProductsRoutes from './routes/requestedProductsRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import notificationRoutes from './routes/notificationRoutes.js'
import reportsRoutes from './routes/reportsRoutes.js'
import userRoutes from './routes/userRoutes.js'
import storeRoutes from './routes/storeRoutes.js'

const app = express()
// const port = 3003
const port = process.env.PORT || 3003; 
import mongoose from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();

console.log("Starting the server...");

// connect to MongoDB
/*
mongoose.connect(process.env.uri)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("MongoDB connection error: ", err))
*/
mongoose.connect(process.env.uri, {
  serverSelectionTimeoutMS: 30000, // Increase server selection timeout to 30 seconds
  socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds
})
  .then(() => {
      console.log("MongoDB connected");
  })
  .catch((err) => {
      console.error("MongoDB connection error: ", err);
  });


app.use(cors())
app.use(express.json())
app.use("/uploads", express.static("uploads"))

app.use("/", (req, res, next) => {
  console.log('Middleware triggered for request:', req.method, req.path); // Add logging or other logic
  next(); // Continue to the next middleware
});

app.use("/admin", productRoutes)
app.use("/", ActivityLogRoutes)
app.use("/", stockRoutes)
app.use("/", categoryRoutes)
app.use("/", requestedProductsRoutes)
app.use("/", orderRoutes)
app.use("/", notificationRoutes)
app.use("/", reportsRoutes)
app.use("/", userRoutes)
app.use("/", storeRoutes)

import cron from "node-cron"
// import { updateExpiredStatus } from "./utils/updateExpirations.js";
import {updateExpiredStatus} from './utils/updateExpirations.js'

// Run every day at midnight (00:00)
cron.schedule("0 0 * * *", async () => {
    try {
      console.log("Running expiration check...");
      await updateExpiredStatus();
      console.log("Expiration update finished.");
    } catch (error) {
      console.error("Cron job failed:", error);
    }
  }, {
    timezone: "Africa/Casablanca"
  // console.log("Running expiration check...");
  // await updateExpiredStatus();
});

app.get('/', (req, res) => {
  res.send('Hello from Railway!');
});

app.get("/test-db", async (req, res) => {
  try {
    const storeStock = await StoreStock.findOne({});
    res.json(storeStock);
} catch (err) {
    res.status(500).json({ message: "Error connecting to DB", error: err });
}
});

// app.listen(port, '0.0.0.0', () => console.log(`server running : http://localhost:${port}`))
app.listen(process.env.PORT || 3003, '0.0.0.0', () => {
  console.log(`Server running on port ${process.env.PORT || 3003}`);
});
