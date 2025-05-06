// const mongoose = require('mongoose')
import mongoose from 'mongoose';

const storeStockSchema = new mongoose.Schema({
    totalItems: {type: Number, required: true, default: 0},
    totalValue: {type: Number, required: true, default: 0},
    totalUnpaid: {type: Number, required: true, default: 0},
    totalIncome: {type: Number, required: true, default: 0},
    totalOutOfStock: {type: Number, required: true, default: 0},
    totalLowInStock: {type: Number, required: true, default: 0},
    totalExpiredProducts: {type: Number, required: true, default: 0},
    totalCategories: {type: Number, required: true, default: 0},
    totalProducts: {type: Number, required: true, default: 0},
    lastUpdated: {type: Date, default: Date.now}
})

storeStockSchema.statics.updateStoreStock = async function(){
    // find all products and calculate total stock quantity and total value
    const products = await mongoose.model("Product").find()
    const categories = await mongoose.model("Category").find()
    const ordersPending = await mongoose.model("Order").find({paymentStatus: "pending"})
    const orders = await mongoose.model("Order").find()

    let totalItems = 0;
    let totalValue = 0;
    let totalUnpaid = 0;
    let totalIncome = 0;
    let totalOutOfStock = 0; 
    let totalLowInStock = 0; 
    let totalExpiredProducts = 0; 

    // calculate the total unpaid
    ordersPending.forEach(order => {
        totalUnpaid += order.rest 
    })

    // the total income
    orders.forEach(order => {
        totalIncome += order.amountPaid
    })

    products.forEach(product => {
        totalItems += product.qty;
        totalValue += product.price * product.qty;
        if (product.outOfStock) totalOutOfStock += 1;
        if (product.lowInStock) totalLowInStock += 1;
        // Check for expired batches within the product
        /*
        let expiredBatchCount = 0;
        product.batches.forEach(batch => {
            // Check if the batch is expired
            if (batch.isExpired || new Date(batch.expirationDate) < new Date()) {
                expiredBatchCount += batch.qty;
            }
        });

        // If there are any expired batches, count the product as expired
        if (expiredBatchCount > 0) {
            totalExpiredProducts += 1;
            console.log(`Expired Product: ${product.productName} - expiredQty: ${expiredBatchCount}`);
        }
            */
        if (product.expiredQty > 0) totalExpiredProducts += 1;
    })

    let totalProducts = products.length;
    let totalCategories = categories.length;

    // update or create the stock data
    await this.findOneAndUpdate({}, {totalItems, totalValue, totalUnpaid, totalIncome, totalOutOfStock, totalLowInStock, totalExpiredProducts, totalCategories, totalProducts, lastUpdated: Date.now()}, {upsert: true})
}

// module.exports = mongoose.model("StoreStock", storeStockSchema);
export default mongoose.model("StoreStock", storeStockSchema);