const express = require('express')
const cors = require('cors')
app = express() 
app.use(cors())
app.use(express.json())

app.use(express.static('dist'))

const PORT = process.env.PORT || 3001

let persons = [
        {
            id: "1",
            name: "kkkkkkkkkkkk",
            number: "777"
        },
        {
            id: "2",
            name: "papugomez",
            number: "9999"
        },
        {
            id: "3",
            name: "zzzzzzzzzzz",
            number: "8181"
        }
  ]

app.get('/', (req, res) => {
    res.end()
})

app.get('/persons', (req, res) => {
    console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
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
    if(chosenPerson) {
        persons = persons.filter(person => person != chosenPerson)
        res.end()
    }
    else {
        res.status(404).end()
    }
})


app.listen(PORT, () => console.log(`Puerto: ${PORT}`))