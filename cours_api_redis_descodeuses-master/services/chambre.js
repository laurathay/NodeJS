redis = require('redis')
accessBdd = redis.createClient()

function sendToRedis(newChambre){
  accessBdd.hset(`chambre:${newChambre.identifiantChambre}`)
}


function getFromRedis(identifiantChambre, callback){
  accessBdd.hgetall(`chambre:${identifiantChambre})
}
