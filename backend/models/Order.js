let mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    // required: true
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: false},
    contact: {
        customerMail: {type: String, required: false}
    },
    shipping: {
        firstName: {type: String, required: false},
        lastName: {type: String, required: false},
        address: {type: String, required: false},
        postalCode: {type: String, required: false},
        city: {type: String, required: false},
        phoneNumber: {type: String, required: false},
        shippingPrice: {type: Number, default: 0, rquired: false}
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
    // isAdminOrder: { type: Boolean, default: false },
    createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Order', orderSchema)