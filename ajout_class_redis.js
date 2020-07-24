const redis = require('redis')
const{Chambre, Client, Reservation} = require('./model')
const utils = require('./utils')

const client = redis.createClient()

let clientHotel = new Client(utils.uuidv4(), nom:" chubby ", prenom:" pinguin ", addresse:" 1 rue des boulets", email:"pasdemail@gmail.com" )
console.log(clientHotel)
client.hset("client:test",
  "identifiantClient", clientHotel.identifiantClient,
  "nom", clientHotel.nom,
  "prenom", clientHotel.prenom,
  "addresse", clientHotel.addresse,
  "email", clientHotel.email,
  (err, res) => {
      console.log(err)
      console.log(res)
  })

  clientHotel = null

  client.hgetall("client:test", (err, res) => {
    console.log(err)
    console.log(res)
  })
