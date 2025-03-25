const mongoose = require('mongoose')

const storeStockSchema = new mongoose.Schema({
    totalItems: {type: Number, required: true, default: 0},
    totalValue: {type: Number, required: true, default: 0},
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

    let totalItems = 0;
    let totalValue = 0;
    let totalOutOfStock = 0; 
    let totalLowInStock = 0; 
    let totalExpiredProducts = 0; 

    products.forEach(product => {
        totalItems += product.qty;
        totalValue += product.price * product.qty;
        if (product.outOfStock) totalOutOfStock += 1;
        if (product.lowInStock) totalLowInStock += 1;
        if (product.isExpired) totalExpiredProducts += 1;
    })
    // let totalIncome
    let totalProducts = products.length;
    let totalCategories = categories.length;

    // update or create the stock data
    await this.findOneAndUpdate({}, {totalItems, totalValue, totalOutOfStock, totalLowInStock, totalExpiredProducts, totalCategories, totalProducts, lastUpdated: Date.now()}, {upsert: true})
}

module.exports = mongoose.model("StoreStock", storeStockSchema);