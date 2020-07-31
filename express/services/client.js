const redis = require('redis')
const {promisify} = require ('util')
const accessBdd = redis.createClient()
const {Client} = require('../models/client')



function sendToRedis(clientHotel) {
    let asyncHset = promisify(accessBdd.hset).bind(accessBdd)
    return asyncHset(`client:${clientHotel.identifiantClient}`,
        "identifiantClient", clientHotel.identifiantClient,
        "nom", clientHotel.nom,
        "prenom", clientHotel.prenom,
        "addresse", clientHotel.addresse,
        "email", clientHotel.email).then((value) => {
        accessBdd.lpush("clients", clientHotel.identifiantClient)
    })
}

async function deleteFromRedis(numeroClient) {
    let asyncLrem = promisify(accessBdd.lrem).bind(accessBdd)
    let asyncDel = promisify(accessBdd.del).bind(accessBdd)

    if (!await exist(numeroClient))
        throw "le client spécifiée n'existe pas"

    await asyncLrem("clients", 1, numeroClient)
    await asyncDel(`client:${numeroClient}`)


async function exist(identifiantClient) {
    let asyncExist = promisify(accessBdd.exists).bind(accessBdd)

    return Boolean(await asyncExist(`client:${identifiantClient}`))
}

//avec putToRedis on remplace l'intégralité de notre objet dans notre bdd par celles de updatedClient
async function putToRedis(identifiantClient){
  let asyncHset= promisify(accessBddd.hset).bind(accessBdd)
  if(!await exist(identifiantClient))
    throw "le client spécifié n'existe pas "

    return asyncHset(`client:${identifiantClient}`,
          "identifiantClient", identifiantClient,
          "nom", updatedClient.nom,
          "prenom", updatedClient.prenom,
          "adresse", updatedClient.adresse,
          "email", updatedClient.email)
}



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


exports.sendToRedis = sendToRedis
exports.getFromRedis = getFromRedis
exports.getAllFromRedis = getAllFromRedis
exports.exist = exist
exports.deleteFromRedis = deleteFromRedis
