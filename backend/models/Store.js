// let mongoose = require('mongoose')
import mongoose from 'mongoose';


const storeSchema = new mongoose.Schema({
    address: {type: String, required: false},
    city: {type: String, required: false},
    country: {type: String, required: false},
    currency: {type: String, default: "MAD", required: false},
    createdAt: {type: Date, default: Date.now}
})

// module.exports = mongoose.model("Store", storeSchema)
export default mongoose.model("Store", storeSchema)
