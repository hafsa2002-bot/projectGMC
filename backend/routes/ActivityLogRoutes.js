import express from 'express'
import ActivityLog from "../models/ActivityLog.js";
import {protect} from '../middlewares/protect.js'

const router = express.Router()

// create new activity
const logActivity = async(userId, userName, action, details) => {
    try{
        await ActivityLog.create({userId, userName, action, details})
    } catch(error) {
        console.log("Failed to log activity: ", error)
    }
}

// get activities
router.get("/activities", protect, async (req, res) => {
    try{
        let activities;
        if(req.user.role === "admin"){
            activities = await ActivityLog.find().sort({createdAt : -1})
        }else{
            activities = await ActivityLog.find({userId: req.user._id}).sort({createdAt : -1})
            // console.log("activities: ", activities)
        }
        res.status(200).json(activities)
    }catch(error){
        console.log("Error retrieving logs: ", error)
        res.status(500).json({message: "Error retrieving logs"})
    }
})

// get activities by userId

export { logActivity };
export default router 