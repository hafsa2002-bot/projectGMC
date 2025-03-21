let mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    // required: true
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: false},
    products: [
        {
            productId:{type: mongoose.Schema.Types.ObjectId, ref:"Product", required: true},
            quantity: {type:Number, required:true}
        }
    ],
    totalAmount: {type: Number, required: true},
    // required: true
    amountPaid: {type: Number, required: false, default: 0},
    rest: {type: Number},

    paymentStatus: {
        type: String,
        enum: ["partially_paid", "paid", "pending", "cancelled"],
        // required: true
        required: true,
        default: "pending"
    },
    createdAt: {type: Date, default: Date.now}
})

/*
orderSchema.pre("save", function (next) {
    this.rest = this.totalAmount - this.amountPaid;

    if(this.amountPaid === 0){
        this.paymentStatus = "pending";
    } else if(this.amountPaid < this.totalAmount){
        this.paymentStatus = "partially_paid";
    } else if(this.amountPaid >= this.totalAmount){
        this.paymentStatus = "paid"
    }

    next();
})
*/

module.exports = mongoose.model('Order', orderSchema)