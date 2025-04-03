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

const app = express()
const port = 3003
import uri from './mongo_uri.js'
import mongoose from 'mongoose'

// connect to MongoDB
mongoose.connect(uri)
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

app.listen(port, () => console.log(`server running : http://localhost:${port}`))