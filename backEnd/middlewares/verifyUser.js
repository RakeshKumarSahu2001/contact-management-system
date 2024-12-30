import jwt from 'jsonwebtoken'
import { user } from '../Models/user.model.js'
import dotenv from 'dotenv'
dotenv.config({ path: "./.env" })

export const verifyUser = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
            try {
                if (err) {
                    return res.status(401).json({ error: "Unauthorized." })
                }
                const userInfo = await user.findOne({ _id: payload._id }).select("-password")
                
                req.user = userInfo
                next()
            } catch (err) {
                
                return res.status(500).json({ error: err.message })
            }
        })
    } else {
        return res.status(403).json({ error: "Forbidden" })
    }
}