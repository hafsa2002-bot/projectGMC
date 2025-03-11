const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    // unique:true
    categoryName: {type: String, required: true}, 
    createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model("Category", categorySchema)