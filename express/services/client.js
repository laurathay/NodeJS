const redis = require('redis')
const {promisify} = require ('util')
const accessBdd = redis.createClient()

//va me servie a récuperer tous mes clients de ma BDD Redis
//créer une fonction asynchrone
async function getAllFromRedis(){
  // on promisify en déclarant Lrange pour récupérer nos données de la bdd Redis
  // bind ne pas trop chercher mais faut le mettre avec promisify
  // bind = cooupler, lier
  let asyncLrange = promisify(accessBdd.lrange).bind(accessBdd)

  //on récupère la liste des IDs de nos clients avec await
  //on veut récupérer tout notre tableau donc on part du 1er élement (0) et on spécifie -1 pour dire qu'on a pas de limite
  //asyncLrange = promise et pas un tableau : await = termine de t'exécuter avant de passer a la suite du code
  let clientsId = await asyncLrange("clients", 0, -1)

  //on créer un nouveau tableau qui va contenir tous nos clients
  let clients = []

  //on boucle sur chaque élément les IDs du tableau clients
  for (let id of clientsId){

    //pour chaque id on va chercher le client correspondant dans la bdd Redis on l'ajoute au tableau cleints
    //on clone chaque donnée récupérée dans le tableau Redis 
    clients.push(Client.fromRedis(await getFromRedis(id)))
  }
  return clients
}

function getFromRedis (identifiantClient){
  let asyncHgetAll = promisify(accessBdd.hgetall).bind(accessBdd)
  return asyncLrange(`client:${identifiantClient}`)
}

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

function getFromRedis(identifiantClient, callback){
    accessBdd.hgetall(`client:${identifiantClient}`,callback)
}

exports.sendToRedis = sendToRedis
exports.getFromRedis = getFromRedis
