import Home from "./pages/Home.jsx"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Register from "./pages/Register.jsx"
import Login from "./pages/Login.jsx"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { createContext, useEffect, useState } from "react"
import axios from "axios"
import Dashboard from "./pages/Dashboard.jsx"
import Contacts from "./components/Contacts.jsx"
import AddContact from "./components/AddContact.jsx"
import EditContact from "./components/EditContact.jsx"
import Logout from "./components/Logout.jsx"
import ProtectedRoutes from "./components/ProtectedRoutes.jsx"
import Profile from "./components/Profile.jsx"
import EditProfile from "./components/EditProfile.jsx"
import SearchResult from "./components/SearchResult.jsx"



export const userContext = createContext(null)
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/dashboard',
    element: <ProtectedRoutes><Dashboard /></ProtectedRoutes>,
    children: [
      {
        index: true,
        element: <Contacts />
      },
      {
        path:"/dashboard/profile",
        element:<Profile />
      },
      {
        path:"/dashboard/search",
        element:<SearchResult />
      },
      {
        path:"/dashboard/edit-profile/:id",
        element:<EditProfile />
      },
      {
        path: '/dashboard/add-contact',
        element: <AddContact />
      },

      {
        path: '/dashboard/edit-contact/:id',
        element: <EditContact />
      },
      {
        path: '/dashboard/contacts',
        element: <Contacts />
      },
    ]
  },
  {
    path: '/logout',
    element: <Logout />
  },
])


function App() {
  const [user, setUser] = useState()
  useEffect(() => {
    axios.get('http://localhost:8001/verify', {
      headers: {
        Authorization: `Berear ${localStorage.getItem("token")}`
      }
    })
      .then((res) => {
        if (res.data.success) {
          // console.log(res.data.user)
          setUser(res.data.user)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  })

  return (
    <>
      <ToastContainer />
      <userContext.Provider value={{ user, setUser }}>
        <RouterProvider router={router} />
      </userContext.Provider>
    </>
  )
}

export default App
