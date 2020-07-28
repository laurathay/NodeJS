const redis = require('redis')
const {promisify} = require ('util')
const accessBdd = redis.createClient()

//va me servie a récuperer tous mes clients de ma BDD Redis
async function getAllFromRedis(){
  let asyncLrange = promisify(accessBdd.lrange).bind(accessBdd)
  let clientsId = await asyncLrange("clients", 0, -1)
  let clients = []
  for (let id of clientsId){
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
