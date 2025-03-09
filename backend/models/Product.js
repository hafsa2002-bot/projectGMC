const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {type: String, required: true},
    price: {type: Number, required: true, min: 0},
    qty: {type:Number, required: true, min: 0},
    barcode: {type: String, required: true, unique: true},
    minLevel: {type:Number, required: true}, 
    // required : false, just for the moment 
    productPhoto: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: false},
    // required : false for the moment 
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: false }
})

productSchema.methods.calculateTotalStockValue = async function(){
    const totalStockValue = this.price * this.stockQty;
    return totalStockValue;
}

module.exports = mongoose.model("Product", productSchema)