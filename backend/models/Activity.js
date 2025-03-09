const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema({
    activityType: {
        type: String, 
        required: true,
        enum:['create', 'update', 'delete']
    },
    // userID => required: false, for the moment
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: false},
    createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model("Activity", activitySchema)