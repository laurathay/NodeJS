const redis = require('redis')
const {promisify} = require('util')
const clientService = require('./client')
const accessBdd = redis.createClient()
const chambreService  =require('./chambre')

//newReservation = toutes les infos qui vont etre remplies dans le formulaire
function sendToRedis(newReservation) {

  //jset prend les parametres qu'on lui donne dans le constructor et crée un nouvel objet
  // = nom de la clé des données qui seront envoyées a redis
  let asyncHset = promisify(accessBdd.hset).bind(accessBdd)

    if (!await clientService.exist(reservation.identifiantClient))
        throw "le client spécifié n'existe pas."
    if(!await chambreService.exist(reservation.identifiantChambre))
      throw "la chambre n'existe pas"

    if(!await chambreService.isAvailable(reservation.identifiantChambre))
      throw "la chambre spécifiée est déjà réservée."

    await asyncHset (
    `reservation:${newReservation.numeroReservation}`,
        'numeroReservation', newReservation.numeroReservation,
        'dateEntree', newReservation.dateEntree,
        'dateSortie', newReservation.dateSortie,
        'identifiantChambre', newReservation.identifiantChambre,
        'identifiantClient', newReservation.identifiantClient,
      )

        //appel du callback des que la fonction est terminé = c'est bon c'est fini
        .then((value) => {
          accessBdd.lpush("reservations", newReservation.numeroReservation)
        })
}


async function deleteFromRedis(numeroReservation){
  let asyncLrem = promisify(accessBdd.lrem).bind(accessBdd)
  let asyncDel = promisify(accessBdd.del).bind(accessBdd)

  if(!await exist(numeroReservation))
    throw "la chambre spécifiée n'existe pas"

  await asyncLrem("reservations", 1 ,numeroReservation)
  await asyncDel(`reservation:${numeroReservation}`)
}



//on veut vérifier que notre numéro de chambre et notre id client existent pour bouclée la creer
//donc on déclare une nouvelle fonction "existe"
function exist(numeroReservation){
  let asyncExist = promisify(accessBdd.exists).bind(accessBdd)

  return Boolean(await asyncExist(`reservation:${identifiantReservation}`))
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
