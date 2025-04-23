import express from 'express'
import mongoose from 'mongoose'
import Store from '../models/Store.js'
import { logActivity } from './ActivityLogRoutes.js'
import { protect } from "../middlewares/protect.js";

const router = express.Router()

// post or update store infos
router.patch("/add-store-infos", protect, async (req, res) => {
    try{
        const {address, city, country, currency} = req.body
        // const store = await Store.findOneAndUpdate({}, {address, city, country, currency}, {new: true})
        
        let store = await Store.findOne();
        if (!store) {
            // If no store exists, create a new one 
            store = new Store({
                address,
                city,
                country,
                currency
            });
            await store.save(); 
            return res.status(201).json({ message: "Store created successfully", store });
        }

        store.address = address
        store.city = city
        store.country = country
        store.currency = currency
        await store.save()

        //log activity
        await logActivity(req.user._id, req.user.name, "Business informations updated", '')
        res.json(store)
    }catch(error){
        console.log("Error: ", error)
        res.status(500).json({error: "Internal server error, failed to add store infos"})
    }
})  

// get store info
router.get("/store-infos", async (req, res) => {
    try{
        const store = await Store.find()
        res.send(store[0])
    }catch(error){
        console.log("Error: ", error)
        res.status(500).json({error: "Internal server error, failed to get store infos"})
    }
})

export default router