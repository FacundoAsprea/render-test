const express = require('express')
const cors = require('cors')
app = express() 
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3001

let persons = [
        {
            id: "1",
            name: "pepe",
            number: "777"
        },
        {
            id: "2",
            name: "papugomez",
            number: "9999"
        },
        {
            id: "3",
            name: "mamaaaaa uuuuuuu",
            number: "8181"
        }
  ]

app.get('/', (req, res) => {
    console.log("AYUDA PORFAVORRRRRRR")
    res.end()
})

app.get('/persons', (req, res) => {
    res.send(persons)
})

app.get('/persons/:id', (req, res) => {
    let id = req.params.id
    let chosenPerson = persons.find(person => person.id === id)
    chosenPerson ? res.send(chosenPerson) : res.status(404).end()
})

app.post('/persons', (req, res) => {
    persons.push(req.body)
    res.end()
})

app.delete('/persons/:id', (req, res) => {
    let id = req.params.id
    let chosenPerson = persons.find(person => person.id === id)
    console.log("OJO AL PIOJO")
    if(chosenPerson) {
        persons = persons.filter(person => person != chosenPerson)
        console.log("PERO CLARO QE SI PAPAAA")
        res.end()
    }
    else {
        res.status(404).end()
    }
})


app.listen(PORT, () => console.log(`Running on port ${PORT}`))