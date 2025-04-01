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
    lastUpdated: {type: Date, default: Date.now},  // track last status update
    isExpiringSoon: { type: Boolean, default: false }
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

productSchema.methods.updateExpirationStatus = async function () {
    const now = new Date();
    
    if (this.expirationDate) {
        const daysLeft = Math.ceil((new Date(this.expirationDate) - now) / (1000 * 60 * 60 * 24));

        // Mark as expired if expiration date has passed
        if (daysLeft <= 0) {
            this.isExpired = true;
        }
        
        // Mark as "expiring soon" only once when exactly 2 day are left
        if (daysLeft <= 2 && daysLeft > 0 && !this.isExpiringSoon) {
            this.isExpiringSoon = true;
            await this.save();  // Save only when status changes
        }
    }
};

/*
productSchema.methods.updateExpirationStatus = async function() {
    const today = new Date();
    const expirationDate = new Date(this.expirationDate);
    
    // Check if expiration is within 3 days (or any other period)
    if (expirationDate - today <= 3 * 24 * 60 * 60 * 1000 && expirationDate > today && !this.isExpired) {
        // Update lastUpdated field when near expiration
        this.lastUpdated = new Date(); // Update timestamp
    }
    
    await this.save();
};
productSchema.methods.checkExpiration = async function(){
    if(this.expirationDate){
        this.isExpired = this.expirationDate < new Date()
    }
    else{
        this.isExpired = false
    }
    await this.save();
}
    */

module.exports = mongoose.model("Product", productSchema)