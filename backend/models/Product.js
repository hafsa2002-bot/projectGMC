import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    productName: {type: String, required: true},
    price: {type: Number, required: true, min: 1},
    qty: {type:Number, required: false, min: 0},
    itemsSold: {type:Number, required: false, default: 0},

    // required:true, unique: true
    barcode: {type: String, required: false, unique: false},
    minLevel: {type:Number, required: true, min: 1}, 

    productPhoto: {type: String, required: false},
    createdAt: {type: Date, default: Date.now},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: false},
    outOfStock : {type: Boolean, default: false},
    lowInStock : {type: Boolean, default: false}, 
    categoryId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Category", 
        required: false, 
        default: null 
    },
    expirationDate: {type: Date, required: false},
    isExpired: {type: Boolean, default: false},
    lastUpdated: {type: Date, default: Date.now},  // track last status update
    isExpiringSoon: { type: Boolean, default: false },
    batches: [
        {
            // batchId: { type: String, required: true },
            qty: { type: Number, required: true, min: 0 },
            expirationDate: { type: Date, required: true },
            isExpired: { type: Boolean, default: false },
            isExpiringSoon: { type: Boolean, default: false }
        }
    ]
})

/*
productSchema.methods.updateStockStatus = async function(){
    this.outOfStock = this.qty === 0
    this.lowInStock = this.qty < this.minLevel
    this.lastUpdated = new Date(); // Update timestamp
    await this.save();
}
*/
productSchema.methods.updateStockStatus = async function() {
    const totalQty = this.batches?.reduce((acc, batch) => acc + batch.qty, 0) || 0;
    
    this.qty = totalQty; 
    this.outOfStock = totalQty === 0;
    this.lowInStock = totalQty < this.minLevel;
    this.lastUpdated = new Date();

    await this.save();
};

productSchema.methods.updateExpirationStatus = async function () {
    const now = new Date();
    
    if (this.expirationDate) {
        const daysLeft = Math.ceil((new Date(this.expirationDate) - now) / (1000 * 60 * 60 * 24));

        // Mark as expired if expiration date has passed
        if (daysLeft <= 0) {
            this.lastUpdated = new Date(); 
            this.isExpired = true;
        }
        
        // Mark as "expiring soon" only once when exactly 10 day are left
        if (daysLeft <= 10 && daysLeft > 0 && !this.isExpiringSoon) {
            this.lastUpdated = new Date(); 
            this.isExpiringSoon = true;
            await this.save();  
        }
    }
};

export default mongoose.model('Product', productSchema)