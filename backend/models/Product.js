const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {type: String, required: true},
    price: {type: Number, required: true, min: 1},
    qty: {type:Number, required: true, min: 1},
    itemsSold: {type:Number, required: false, default: 0},

    // required:true, unique: true
    barcode: {type: String, required: false, unique: false},
    minLevel: {type:Number, required: true, min: 1}, 

    // required : true
    productPhoto: {type: String, required: false},
    createdAt: {type: Date, default: Date.now},

    //required: true
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: false},
    outOfStock : {type: Boolean, default: false},
    lowInStock : {type: Boolean, default: false}, 
    categoryId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Category", 
        required: false, 
        default: null },
    expirationDate: {type: Date, required: false},
    isExpired: {type: Boolean, default: false},
    lastUpdated: {type: Date, default: Date.now}  // track last status update
})

// to calculate the the total stock value in StoreStock collection
productSchema.methods.calculateTotalStockValue = async function(){
    const totalStockValue = this.price * this.stockQty;
    return totalStockValue;
}

productSchema.methods.updateStockStatus = async function(){
    this.outOfStock = this.qty === 0
    this.lowInStock = this.qty < this.minLevel
    this.lastUpdated = new Date(); // Update timestamp
    await this.save();
}

productSchema.methods.checkExpiration = async function(){
    if(this.expirationDate){
        this.isExpired = this.expirationDate < new Date()
    }
    else{
        this.isExpired = false
    }
    await this.save();
}

module.exports = mongoose.model("Product", productSchema)