const mongoose = require("mongoose")

const requestedProductSchema = new mongoose.Schema({
    reqProductName: {type: String, required: true},
    numberOfRequests: {type: Number, default: 1}
})

module.exports = mongoose.model("RequestedProduct", requestedProductSchema)