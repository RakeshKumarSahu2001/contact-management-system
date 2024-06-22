import mongoose from 'mongoose'
import { user } from './user.model.js'

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: user
    }
}, { timestamps: true })

export const contact = mongoose.model('contact', contactSchema)