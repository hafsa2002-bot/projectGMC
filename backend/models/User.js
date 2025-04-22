let mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String,required: true},
    role: {
        type: String,
        enum: ["admin", "member", "client"], 
        default: "client"
    },
    photo: {type: String, required: false},
    phoneNumber: {type: String, default: "", required: false},
})

module.exports = mongoose.model("User", userSchema)
