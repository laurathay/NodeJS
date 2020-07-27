const redis = require('redis')
const accessBdd = redis.createClient()

function sendToRedis (clientHotel){
  accessBdd.hset(`client:${clientHotel.identifiantClient}`,
    "identifiantClient", clientHotel.identifiantClient,
    "nom", clientHotel.nom,
    "prenom", clientHotel.prenom,
    "addresse", clientHotel.addresse,
    "email", clientHotel.email,
    (err, res) => {
      if(err)
          throw err
    })
}

get nom(){
  return this._nom
}

set prenom(value){
  if (typeof value === "string" )
    this._nom = value
  else{
    throw "la valeur de la propriété 'pronom' doit toujours être une chaine de caractere."
  }
}
