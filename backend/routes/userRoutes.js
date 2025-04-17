import express from 'express'
import jsonwebtoken from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'

import User from '../models/User.js'
import { logActivity } from './ActivityLogRoutes.js'
import {protect} from '../middlewares/protect.js'

const router = express.Router()
const JWT_SECRET = "123@hafsa/"

// register
router.post("/users/register", protect, async (req, res) => {
    try{
        const {name, email, password, role} = req.body;
        if(!name || !email || !password || !role){
            res.status(400).json({message: "Please add all fields"})
        }

        // check if user exists
        const userExists = await User.findOne({email})
        if(userExists){
            res.status(400).json({message: "User already exists"})
        }

        // hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        // create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword, 
            role
        })

        if(user){
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id, user.role)
            })

            //log activity
            await logActivity(req.user._id, req.user.name, `New ${user.role} added`, `${user.name}`)
        }else{
            res.status(400).json({message: "Invalid user data"})
        }
    }catch(error){
        console.log("Error: ", error)
        res.status(500).json({message: "Internal server error"})
    }
})

// login
router.post("/users/login", async (req, res) => {
    try{
        const {email, password} = req.body;

        //check for user email
        const user = await User.findOne({email})

        if(user && (await bcryptjs.compare(password, user.password))){
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id, user.role)
            })
        }else{
            res.status(400).json({message: "Invalid data"})
        }
    }catch(error){
        console.log("Error: ", error)
        res.status(500).json({message: "Internal server error"})
    }
})

// get user data
router.get("/users/data", protect, async(req, res) => {
    try{
        const {_id, name, email} = await User.findById(req.user.id)
        res.status(200).json({
            id: _id,
            name,
            email
        })
    }catch(error){
        console.log("Error: ", error)
        res.status(500).json({message: "Internal server error"})
    }
})

// get user by email
router.get("/user/:email", async(req, res) => {
    try{
        const user = await User.find({email: req.params.email})
        res.send(user)
    }catch(error){
        console.log("Error: ", error)
        res.status(500).json({message: "Internal server error"})
    }
})

// get all members
router.get("/all-users", async (req, res) => {
    try{
        const users = await User.find()
        // console.log("users: ", users)
        res.json(users)
    }catch(error){
        console.log("Error: ", error)
        res.status(500).json({message: "Internal server error"})
    }
})

// update user role 
router.patch("/update-role/:id", protect, async(req, res) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id, {role: req.body.role}, {new: true})

        //log activity
        await logActivity(req.user._id, req.user.name, "Role updated", `${user.name}, new role: ${req.body.role}`)

        res.json(user)
    }catch(error){
        console.log("Error: ", error)
        res.status(500).json({message: "Internal server error"})
    }
})

//delete member by id
router.delete("/delete-user/:id", protect, async(req, res) => {
    try{
        const deletedUser = await User.findByIdAndDelete({_id: req.params.id})
        if(!deletedUser){
            return res.status(404).json({error: "User not found"})
        }
        console.log("deleted user: ", deletedUser)

        //log Activity
        await logActivity(req.user._id, req.user.name, "User deleted", deletedUser.name)

        res.json({message: "user deleted successfully", deletedUser})
    }catch(error){
        console.log("Error: ", error)
        res.status(500).json({message: "Internal server error"})
    }
})

// generate JWT
const generateToken = (id, role) => {
    return jsonwebtoken.sign({id, role}, JWT_SECRET, {
        expiresIn: '24h'
    })
}



export default router