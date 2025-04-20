const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
    productId: {type: mongoose.Schema.Types.ObjectId, ref: "Product"},
    notificationName : {
        type: String,
        enum: ['low in stock', 'out of stock', 'expired', 'expiring soon', 'new order received'],
        required: true
    },
    daysLeft: { type: Number },
    createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Notification', notificationSchema)