// on importe le module express
const express = require('express')
const bodyParser = require('body-parser')

// on créer une nouvelle application express
let app = express()

app.use(bodyParser.json()) //configurer notre application et configure le middle ware , pour dire a notre app de utiliser bodyPArser.json, pour convertir toutes nos requetes en json

 // on déclare une route '/' qui va sjuste renvoyé "bienvenue trouduc" sous forme de texte
app.get('/patate', (req, res) => {
  res.status(200)
  res.send("bienvenue patate")
})

app.get('/page2', (req, res) => {
  res.status(200)
  res.send("bienvenue au 2eme")
})

app.get('/', (req, res) => {
  console.log(req.body)
  res.status(200)
  res.send("bienvenue trouduc")
})

// on lance notre serveur sur le port 8080
app.listen(8080, () => {
  console.log("serveur a explosé")
})
