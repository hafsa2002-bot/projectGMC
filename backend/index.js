const express = require('express')
const axios = require('axios')
const cors = require('cors')
const app = express()
const port = 3003

const uri = require("./mongo_uri")
let mongoose = require('mongoose')

app.use(cors())
app.use(express.json())

// connect to MongoDB
mongoose.connect(uri)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("ERROR: ", err))

const User = require('./models/User.js')
const User = require('./models/Product.js')
const User = require('./models/Order.js')
const User = require('./models/Activity.js')

app.get("/", (req, res) => {

})

app.listen(port, () => console.log(`server running : http://localhost:${port}`))