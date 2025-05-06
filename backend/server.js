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
const PORT = process.env.PORT || 3003; 
import mongoose from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();

// connect to MongoDB
mongoose.connect(process.env.uri)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("ERROR: ", err))

app.use(cors())
app.use(express.json())
app.use("/uploads", express.static("uploads"))

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

app.listen(PORT, () => console.log(`server running : http://localhost:${PORT}`))