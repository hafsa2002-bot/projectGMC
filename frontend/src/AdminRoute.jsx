import React from 'react'
import { Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

function AdminRoute({children}) {
    const token = localStorage.getItem("token");

    if (!token) return <Navigate to="/" replace />;

    try {
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();

        if (isExpired || decoded.role !== "admin") {
            return <Navigate to="/unauthorized" replace />;
        }

        return children;

    } catch (err) {
        console.error("Invalid token", err);
        localStorage.removeItem("token");
        return <Navigate to="/" replace />;
    }
}

export default AdminRoute
