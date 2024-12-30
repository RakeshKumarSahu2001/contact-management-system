import React, { Children } from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoutes({ children }) {
    const token = localStorage.getItem("token")

    return token ? children : <Navigate to="/" replace />
}

    export default ProtectedRoutes