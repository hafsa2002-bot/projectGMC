import express from 'express'
import RequestedProduct from '../models/RequestedProduct.js'
import { logActivity } from './ActivityLogRoutes.js'

const router = express.Router()

// add new Requested product
router.post("/admin/dashboard/add-requested-product", async(req, res) => {
    try{
        const {reqProductName} = req.body
        const newProduct = new RequestedProduct({reqProductName})
        await newProduct.save()

         // log activity
        await logActivity("User name", "Requested Product added", `${reqProductName}`)
        res.json({message: "Requested product added successfully", reqProductName})
    }catch(error){
        console.log("Error: ", error)
        res.status(500).json({error: "Internal server error, failed to add requested product"})
    }
})

// get Requested products
router.get("/admin/dashbord/requested-products", async(req, res) => {
    try{
        const requestedProducts = await RequestedProduct.find()
        res.send(requestedProducts)
    }catch(error){
        console.log("Error: ", error)
        res.status(500).json({error: "Internal server Error, failed to get requested products"})
    }
})

// delete requested product by ID
router.delete("/admin/dashboard/delete-requested-product/:id", async(req, res) => {
    try{
        const deletedProduct = await RequestedProduct.findByIdAndDelete({_id: req.params.id})
        if(!deletedProduct){
            return res.status(404).json({error: "product not found"})
        }
        console.log("deleted product: ", deletedProduct)

         // log activity
        await logActivity("User name", "Requested Product deleted", `${deletedProduct.reqProductName}`)
        res.json({message: "product deleted successfully", deletedProduct})
    }catch(error){
        console.log("Error: ", error)
        res.status(500).json({error: "Internal server error, failed to delete requested product"})
    }
})

export default router