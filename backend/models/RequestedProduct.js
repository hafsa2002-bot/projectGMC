// const mongoose = require("mongoose")
import mongoose from 'mongoose';


const requestedProductSchema = new mongoose.Schema({
    reqProductName: {type: String, required: true},
    numberOfRequests: {type: Number, default: 1}
})

// module.exports = mongoose.model("RequestedProduct", requestedProductSchema)
export default mongoose.model("RequestedProduct", requestedProductSchema)