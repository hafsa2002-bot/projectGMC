let mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: {type: String, required: true},
    userPassword: {type: String,required: true},
    role: {
        type: String,
        enum: ["admin", "member", "client"], 
        default: "client"
    }
})

module.exports = mongoose.model("User", userSchema)
