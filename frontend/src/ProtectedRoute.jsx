import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

function ProtectedRoute({children}) {
    const [expired, setExpired] = useState(false)
    const [token, setToken] = useState(localStorage.getItem("token"))

    useEffect(() => {
        if (!token) {
            setExpired(true)
            return
        }

        let decoded
        try {
            decoded = jwtDecode(token)
        } catch (error) {
            console.log("Invalid token")
            localStorage.removeItem("token") // Remove invalid token
            setToken(null) // Update state so the token is cleared
            setExpired(true) // Mark as expired
            return
        }

        // Check if the token has expired
        const isExpired = decoded.exp * 1000 < Date.now()
        if (isExpired) {
            localStorage.removeItem("token") // Remove expired token
            setToken(null) // Update state to reflect expired token
            setExpired(true) // Mark as expired
        }
    }, [token])

    if(expired || !token){
        return <Navigate to="/" replace />
    }

    let decoded;
    try{
        decoded = jwtDecode(token);
    }catch(error){
        console.log("Invalid token")
        localStorage.removeItem("token")
        return <Navigate to="/login" replace />
    }

    if(decoded.role !== "admin" && decoded.role !== "member"){
        return <Navigate to="/unauthorized" replace />
    } 

    return children
}

export default ProtectedRoute

