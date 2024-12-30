import React, { useContext, useEffect } from 'react'
import { userContext } from "../App.jsx"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { useNavigate } from "react-router-dom";

function Logout() {
    const {user, setUser } = useContext(userContext)
    const mySwal = withReactContent(Swal)
    const navigate = useNavigate()

    useEffect(() => {
        mySwal.fire({
            title: "Are you sure?",
            text: "Do you want to exit!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear()
                setUser(null)
                console.log("user =",user)
                navigate("/")
            } else {
                navigate(-1);  // Go back to the previous page if the user cancels
            }
        })
    }, [mySwal, navigate, setUser])

    return null
}

export default Logout
