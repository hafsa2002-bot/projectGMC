
/*
const express = require('express')
const axios = require('axios')
const cors = require('cors')
*/
import express from 'express'
import axios from 'axios'
import cors from 'cors'

const app = express()
const port = 3003
import uri from './mongo_uri.js'
import mongoose from 'mongoose'

import User from './models/User.js'
import Product from './models/Product.js'
import Order from './models/Order.js'
import Activity from './models/Activity.js'
import StoreStock from './models/StoreStock.js'

/*
const uri = require("./mongo_uri.js")
let mongoose = require('mongoose')
*/

app.use(cors())
app.use(express.json())

// connect to MongoDB
mongoose.connect(uri)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("ERROR: ", err))

/*
const User = require('./models/User.js')
const Product = require('./models/Product.js')
const Order = require('./models/Order.js')
const Activity = require('./models/Activity.js')
const StoreStock = require('./models/StoreStock.js')
*/

const newUser = new User({
    userName: "hafsa Barhoud",
    userPassword: "hafsa123",
    role: "admin"
})

await newUser.save()
console.log("User saved: ", newUser)


app.get("/", (req, res) => {

})


app.listen(port, () => console.log(`server running : http://localhost:${port}`))