const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema({
    activityType: {
        type: String, 
        required: true,
        enum:['create', 'update', 'delete']
    },
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model("Activity", activitySchema)