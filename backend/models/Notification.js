const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
    productId: {type: mongoose.Schema.Types.ObjectId, ref: "Product", required: false },
    batchId: { type: mongoose.Schema.Types.ObjectId, required: false },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: false },
    message: String,
    type : {
        type: String,
        enum: ['low in stock', 'out of stock', 'expired', 'expiring soon', 'new order received'],
        required: true
    },
    createdAt: {type: Date, default: Date.now}
})
notificationSchema.index({ type: 1, productId: 1, batchId: 1 }, { unique: true, partialFilterExpression: { batchId: { $exists: true } } });

module.exports = mongoose.model('Notification', notificationSchema)