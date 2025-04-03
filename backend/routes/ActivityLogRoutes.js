import express from 'express'
import ActivityLog from "../models/ActivityLog.js";

const router = express.Router()

// create new activity
const logActivity = async(user, action, details) => {
    try{
        await ActivityLog.create({user, action, details})
    } catch(error) {
        console.log("Failed to log activity: ", error)
    }
}

// get activities
router.get("/activities", async (req, res) => {
    try{
        const logs = await ActivityLog.find().sort({createdAt : -1})
        res.status(200).json(logs)
    }catch(error){
        console.log("Error retrieving logs: ", error)
        res.status(500).json({message: "Error retrieving logs"})
    }
})

export { logActivity };
export default router 