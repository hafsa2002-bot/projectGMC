const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryName: {type: String, required: true, unique: true}, 
    createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model("Category", categorySchema)