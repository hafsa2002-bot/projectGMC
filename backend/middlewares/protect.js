import jsonwebtoken from 'jsonwebtoken'
import User from '../models/User.js'
const JWT_SECRET = "123@hafsa/"

export const protect = async (req, res, next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            //get token from header
            token = req.headers.authorization.split(' ')[1]

            //verify token
            const decoded = jsonwebtoken.verify(token, JWT_SECRET)

            //get user from the token
            req.user = await User.findById(decoded.id).select('-password')

            next()
        }catch(error){
            console.log("Error: ", error)
            res.status(401).json({message: "Not authorized"})
        }
    }
    if(!token){
        res.status(401).json({message: "not authorized, no token"})
    }
}

