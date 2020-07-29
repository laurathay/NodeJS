//creer notre serveur et porte d'entrée pour les requetes
// créer constante utile au module

// on importe le module express
const express = require('express')

//module qui appartient a express, coupe les données en petites données, chaque paquet envoyé au serveur = requete = petit paquet. récupère les données clients de la page navigateur et les transforme en JSON
// récupère notre requete et récupère tout les petits paquets de facon cohérente et lu par notre code
//c'est un middleware, s'exécute avant/ après chaque requete que ton serveur récupère la requete et envoie a l'API et vicee versa au client = bout de code JS
const bodyParser = require('body-parser')
// Client => Middleware => Serveur => Code
// Code => Serveur => Middleware => Code

const clientService = require('./services/client')

const{Client} = require('./models/client')
const{Reservation} = require('./models/reservation')
const{Chambre} = require('./models/chambre')

const {uuidv4} = require ('./utils')

// on créer une nouvelle application express
let app = express()

//on dit a notre application d'utiliser notre middleware, intercepte les requetes et les modifie 
app.use(bodyParser.json()) //configurer notre application et configure le middle ware , pour dire a notre app de utiliser bodyPArser.json, pour convertir toutes nos requetes en json

//Client => Middleware => serveur => code
//Code => Serveur => Middleware => Client

//pour le client :
app.get('/client', (req, res) => {
    res.status(200)
    res.json(await clientService.getAllFromRedis())
    //res.send("bienvenue à l'acceuil")
})

app.post('/client', async (req, res) => {
    let newClient = Client.fromRedis(req.body)
    newClient.identifiantClient = uuidv4()
    console.log(newClient)

    await clientService.sendToRedis(newClient)
    res.status(200)
    res.json()
})

//pour reservation :
app.get('/reservation', (req, res) => {
    res.status(200)
    res.json(await Reservation.getAllFromRedis())
    //res.send("bienvenue à l'acceuil")
})

app.post('/reservation', async (req, res) => {
    let newReservation = Reservation.fromRedis(req.body)
    newClient.numeroReservation = uuidv4()
    console.log(newClient)

    await clientService.sendToRedis(newReservation)
    res.status(200)
    res.json()
})
app.listen(8080, () => {
    console.log("serveur lancé")
})




 // on déclare une route '/' qui va sjuste renvoyé "bienvenue trouduc" sous forme de texte
// app.get('/patate', (req, res) => {
//   res.status(200)
//   res.send("bienvenue patate")
// })
//
// app.get('/page2', (req, res) => {
//   res.status(200)
//   res.send("bienvenue au 2eme")
// })
//
// app.post('/client', async (req, res) =>{
//   let newClient = Client.fromRedis(req.body)
//   await clientService.sendToRedis(newClient)
//   res.statut(200)
//   res.send("prout prout")
// })
//
// app.get('/', (req, res) => {
//   console.log(req.body)
//   res.status(200)
//   res.send("bienvenue trouduc")
// })

// on lance notre serveur sur le port 8080
app.listen(8080, () => {
  console.log("serveur a explosé")
})
