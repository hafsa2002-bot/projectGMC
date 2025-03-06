const mongoose = require('mongoose')

const storeStockSchema = new mongoose.Schema({
    totalItems: {type: Number, required: true, default: 0},
    totalValue: {type: Number, required: true, default: 0},
    lastUpdated: {type: Date, default: Date.now}
})

storeStockSchema.statics.updateStoreStock = async function(){
    // find all products and calculate total stock quantity and total value
    const products = await mongoose.model("Product").find()

    let totalItems = 0;
    let totalValue = 0;

    products.forEach(product => {
        totalItems += product.stockQty;
        totalValue += product.price * product.stockQty;
    })

    // update or create the stock data
    await this.findOneAndUpdate({}, {totalItems, totalValue, lastUpdated: Date.now()}, {upsert: true})
}

module.exports = mongoose.model("StoreStock", storeStockSchema);