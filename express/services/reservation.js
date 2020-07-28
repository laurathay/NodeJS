const redis = require('redis')
const {promisify} = require('util')
const accessBdd = redis.createClient()
const {Client} = require('../models/reservation')
function sendToRedis(newReservation) {
  let asyncHset = promisify(accessBdd.hset).bind(accessBdd)
    return asyncHset (
    `reservation:${newReservation.numeroReservation}`,
        'numeroReservation', newReservation.numeroReservation,
        'dateEntree', newReservation.dateEntree,
        'dateSortie', newReservation.dateSortie,
        'identifiantChambre', newReservation.identifiantChambre,
        'identifiantClient', newReservation.identifiantClient,
      )
        .then((value) => {
          accessBdd.lpush("reservations", newReservation.numeroReservation)
        })
}
async function getAllFromRedis() {
  // on crée une version asynchrone de la fonction lrange
  let asyncLrange = promisify(accessBdd.lrange).bind(accessBdd)
  // on récupère la liste des IDs de nos clients avec await
  // on veut récupérer tout notre tableau donc on part du 1er élément (0) et on spécifie 1 pour dire qu'on a pas de limite
  let reservationsId = await asyncLrange("reservations", 0, -1)
  // on crée un nouveau tableau qui va contenir tous nos clients
  let reservations = []
  // on boucle sur chaque élément (les IDs) du tableau clients
  for (let id of reservationsId) {
    // pour chaque id on va chercher le client correspondant dans la bdd Redis et on l'ajoute au tableau clients
    reservations.push(Reservation.fromRedis(await getFromRedis(id)))
  }
  return reservations
}
function getFromRedis(numeroReservation) {
  let asyncHgetAll = promisify(accessBdd.hgetall).bind(accessBdd)
  return asyncHgetAll(`reservation:${numeroReservation}`)
}
exports.sendToRedis = sendToRedis;
exports.getFromRedis = getFromRedis;
exports.getAllFromRedis = getAllFromRedis;
