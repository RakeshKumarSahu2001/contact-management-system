import express from 'express'
import { contact } from '../Models/contact.model.js'


export const addContact = async (req, res) => {
    const { name, email, phone, address } = req.body
    // console.log("result =",req.body)
    try {
        const newContact = new contact({
            name: name,
            email: email,
            phone: phone,
            address: address,
            postedBy: req.user._id
        })
        const saveNewContact = await newContact.save()

        return res.status(201).json({ success: true, ...saveNewContact._doc })
    } catch (err) {
        console.log("Error", err)
        res.status(500).json({ error: err.message })
    }
}


export const getContacts = async (req, res) => {
    // console.log("hello")
    try {
        const contacts = await contact.find({ postedBy: req.user._id })
        // console.log(" contacts are :", contacts)
        return res.status(200).json({ success: true, contacts })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}


export const getContact = async (req, res) => {
    const { id } = req.params
    if (!id) {
        return res.status(401).json({ error: "no id" })
    }
    try {
        const userDetail = await contact.findOne({ _id: id })
        return res.status(200).json({ success: true, ...userDetail._doc })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

export const updateContact = async (req, res) => {
    const { id } = req.params
    if (!id) {
        return res.status(401).json({ error: "No id specifed" })
    }
    try {
        const updateUserContact = await contact.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })
        return res.status(200).json({ success: true, ...updateUserContact._doc })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}


export const deleteContact = async (req, res) => {
    const { id } = req.params;
    console.log("id =", id)
    if (!id) {
        return res.status(401).json({ error: "No id found" })
    }
    try {
        const contactRecord = await contact.findOne({ _id: id })
        if (!contactRecord) {
            return res.status(401).json({ error: "No record existed" })
        }
        await contact.findByIdAndDelete({ _id: id })
        const updatedContacts = await contact.find({ postedBy: req.user._id }) // Rename variable to avoid conflict
        return res.status(200).json({ success: true, contacts: updatedContacts }) // Ensure correct key in response
    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}


export const searchResult = async (req, res) => {
    const { searchData } = req.body;
    console.log('Search Data:', searchData);

    if (!searchData) {
        return res.status(401).json({ error: "Enter data" })
    }
    let results;
    try {

        if (!isNaN(searchData)) {
            results = await contact.find({
                phone: searchData
            });
        } else {
            results = await contact.find({
                $or: [
                    { name: searchData },
                    { email: searchData },
                ]
            });
        }
        console.log("hello")
        console.log(results)
        res.status(200).json({ msg: 'Data received successfully',  results });
    } catch (err) {
        res.status(200).json({ err: err.message })
    }

};
