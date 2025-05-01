const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

mongoURL = process.env.MONGODB_URL

mongoose.connect(mongoURL)
.then(() => console.log("Connected to MongoDB", mongoURL))
.catch((err) => console.error("An error ocurred while trying to connect to MongoDB: ", err))

const personSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String
})

const Person = mongoose.model('Person', personSchema)


const getStoredUsers = () => {
    return (
        Person.find({})
        .then(result => {
            return Object.values(result)
        })
    )
}

const addUser = ( { name, phoneNumber } ) => {
    const newUser = new Person({
        name: name,
        phoneNumber: phoneNumber
    })
    newUser.save()
    .then(newUser => {
        console.log("Added a new user: ", newUser)
    })
}

const eraseUser = (userId) => Person.findByIdAndDelete(userId)

const replaceUser = (userId, updatedUser) => Person.findByIdAndUpdate(userId, updatedUser, { new: true })

module.exports = { getStoredUsers, addUser, eraseUser, replaceUser }