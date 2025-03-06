const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {type: String, required: true},
    productPrice: {type: Number, required: true, min: 0},
    stockQty: {type:Number, required: true, min: 0},
    barcode: {type: String, required: true, unique: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    productImage: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
})

productSchema.methods.calculateTotalStockValue = async function(){
    const totalStockValue = this.price * this.stockQty;
    return totalStockValue;
}

module.exports = mongoose.model("Product", productSchema)