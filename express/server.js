//creer notre serveur et porte d'entrée pour les requetes
// créer constante utile au module

// on importe le module express
const express = require('express')

//bodyPArser module (middleware) qui appartient a express, coupe les données en petites données, chaque paquet envoyé au serveur = requete = petit paquet. récupère les données clients de la page navigateur et les transforme en JSON
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
//ca peut etre une autre methode: .xml , .txt, .raw ... json le plus + utiliser
// buffer = body a l'état pure donc binaire



//ici on crée le nouveau client dans notre bdd de Redis (la bdd le renvoie) et recupérer avec post
app.post('/client', async (req, res) => {
    //req.body : on recupere le body de notre parser, i.E. les données envoyées par le client
    let donneesFormulaire = req.body
    //la on regroupe les données selon le modele de l'objet Client (models/client.js)
    let newClient = Client.fromRedis(req.body)
    newClient.identifiantClient = uuidv4()
    console.log(newClient) //pour vérifier si ca fonctionne

    //après avoir préparé donc la on envoie les données sur la bdd redis
    //await pour que notre promise soit exécutée de facon synchrone
    await clientService.sendToRedis(newClient)
    res.status(200)

    res.json()
})

//pour le client, il lui repond
app.get('/client', async (req, res) => {
    res.status(200)
    res.json(await clientService.getAllFromRedis()) //reponse en json avant middleware et sera fait une fois que getAllFromRedis qui vient du fichier clier service sois terminé
    //res.send("bienvenue à l'acceuil")
})


app.delete('/client', (req, res) => {
    res.status(400)
    res.json({"error": "paramètre identifiant client non spécifié (ex: delete http://localhost/client/e94c0559-79f2-4e43-9781-22daec0b03ff)"})
})
//delete = methode ou fonction qui appartient a express 
app.delete('/client', async (req, res) =>{
  let idClientEnvoye = req.body.identifiantClient

  if idClientEnvoye === false {
    res.status(400) // n'arrete pas le prog donc else
    res.json({erreur: "Rien recu"})
  } else {
        try{
            await clientService.deleted(identifiantClient)
            res.send('Le client a été supprimé') //met automatiquement un status 200
        } catch (e) {
            res.status(400)
            res.json({"erreur": e})
        }
    }
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
// app.listen(8080, () => {
//   console.log("serveur a explosé")
// })
