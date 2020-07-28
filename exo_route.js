const express = require ('express')

let app = express()

app.get('/accueil', (req, res) => {
  res.status(200)
  res.send("bienvenue")
})

app.get('/voyages', (req, res) => {
  res.status(200),
  res.send("pret pour l'envol?")
})

app.get('/', (req, res) => {
  console.log(req.body)
  res.status(200)

})
