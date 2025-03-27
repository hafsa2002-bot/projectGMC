const mongoose = require('mongoose')

const activityLogSchema = new mongoose.Schema({
    // userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    user: {type: String},
    action: {type: String, required: true},
    details: {type: String},
    createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model("ActivityLog", activityLogSchema)