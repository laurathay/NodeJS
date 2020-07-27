const express = require('express')
const bodyParser = require('body-parser')

let app = express()

app.use(bodyParser.json()) //configurer notre application et configure le middle ware , pour dire a notre app de utiliser bodyPArser.json, pour convertir toutes nos requetes en json

app.get('/patate', (req, res) => {
  res.status(200)
  res.send("bienvenue trouduc")
})

app.get('/page2', (req, res) => {
  res.status(200)
  res.send("bienvenue trouduc")
})

app.get('/', (req, res) => {
  console.log(req.body)
  res.status(200)
  res.send("bienvenue trouduc")
})

app.listen(8080, () => {
  console.log("serveur a explosé")
})
