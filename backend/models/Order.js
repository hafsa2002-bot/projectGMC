let mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    // required: true
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", default: null},
    contact: {
        customerMail: {type: String, required: true}
    },
    shipping: {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        address: {type: String, required: true},
        postalCode: {type: String, required: false},
        city: {type: String, required: true},
        phoneNumber: {type: String, required: true},
        shippingPrice: {type: Number, default: 0, rquired: true}
    },
    products: [
        {
            productId:{type: mongoose.Schema.Types.ObjectId, ref:"Product", required: true},
            name: {type: String, required: true},
            quantity: {type:Number, required:true},
            price: {type: Number, required: true}
        }
    ],
    totalAmount: {type: Number, required: true},
    // required: true
    amountPaid: {type: Number, required: true, default: 0},
    rest: {type: Number},
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'refunded'],
        required: true,
        default: "pending"
    },
    status: {
        type: String,
        enum: ['pending', 'packed', 'done', 'canceled'],
        required: true,
        default: 'pending'
    },
    createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Order', orderSchema)