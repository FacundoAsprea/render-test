require('dotenv').config()
const express = require('express')
const cors = require('cors')

const mongoDB = require('./models/Person.js')

app = express() 
app.use(cors())
app.use(express.json())

app.use(express.static('dist'))

let persons
const updateUserList = () => {
    return new Promise((resolve, reject) => {
        mongoDB.getStoredUsers()
        .then((result) => {
            persons = result
            resolve(true)
        })
    })
}

const PORT = process.env.PORT || 3001

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
    next(error)
  }

app.get('/', (req, res) => {
    res.end()
})

app.get('/persons', (req, res) => {
    updateUserList()
    .then(() => res.send(persons))
})

app.get('/persons/:id', (req, res) => {
    updateUserList()
    .then(() => {
        let id = req.params.id
        let chosenPerson = persons.find(person => person.id === id)
        chosenPerson ? res.send(chosenPerson) : res.status(404).end()
    })
})

app.post('/persons', (req, res) => {
    mongoDB.addUser(req.body)
    res.end()
})

app.delete('/persons/:id', (req, res, next) => {
    updateUserList()
    .then(() => {
        let id = req.params.id
        mongoDB.eraseUser(id)
        .then(() => res.status(204).end())
        .catch(err => next(err))
    })
})

app.put('/persons/:id', (req, res, next) => {
    let id = req.params.id
    mongoDB.replaceUser(id, req.body)
    .then(() => res.end())
    .catch((err) => next(err))
})

app.use(errorHandler)
app.listen(PORT, () => console.log(`Puerto: ${PORT}`))