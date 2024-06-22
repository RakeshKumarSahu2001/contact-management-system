import express from 'express'
import { Register,Login, Auth,userProfile,editprofile,updatedUserProfile } from '../controllers/userController.js'
import { body } from 'express-validator'
import { verifyUser } from '../middlewares/verifyUser.js'
import { addContact,getContacts,getContact,updateContact,deleteContact,searchResult } from '../controllers/contactController.js'

const route = express.Router()
//user routes
route.post("/register",
    [body("email").trim().isEmail().notEmpty().withMessage("Email should not be empty"),
    body("name").trim().notEmpty().withMessage("Name should not be empty"),
    body("password").trim().notEmpty().withMessage("Email should not be empty")], Register)

route.post("/login",
[body("email").trim().isEmail().notEmpty().withMessage("Email should not be empty"),
body("password").trim().notEmpty().withMessage("Email should not be empty")],Login)


route.get("/verify",verifyUser,Auth)

//contact route
route.get("/profile",verifyUser,userProfile)
route.get("/edit-profile/:id",verifyUser,editprofile)
route.put("/update-profile/:id",verifyUser,updatedUserProfile)
route.post('/addcontact',verifyUser,addContact)

//search
route.post("/search",verifyUser,searchResult)

route.get('/contacts',verifyUser,getContacts)

route.get('/contacts/:id',verifyUser,getContact)
route.put("/update-contact/:id",verifyUser,updateContact)
route.delete("/contacts/:id",verifyUser,deleteContact)

export default route