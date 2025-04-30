const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryName: {type: String, required: true},
    photo: {type: String,required: false},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}, 
    createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model("Category", categorySchema)