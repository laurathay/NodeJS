const redis = require('redis')
const{promisify} = require('util')
const accessBdd = redis.createClient()
const{Client} = require('./models/reservation')

function sendToRedis(reservation){
  let asyncHset = promisify(accessBdd.hset).bind (accessBdd)
    return asyncHset(
    `reservation:${reservation.numeroReservation}`,
      `numeroReservation`, reservation.numeroReservation,
      `dateEntree`, reservation.dateEntree,
      `dateSortie`, reservation.dateSortie,
      `identifiantChambre`, reservation.identifiantChambre,
      `identifiantClient`, reservation.identifiantClient,
    )
      .then((value) => {
        accessBdd.lpush("reservation", reservation.numeroReservation)
      })
    (err, res) => {
      if(err)
        throw err
    }
}

class Reservation {
    constructor(numeroReservation, dateEntree, dateSortie, identifiantChambre, identifiantClient) {
        this.numeroReservation = numeroReservation
        this.dateEntree = dateEntree
        this.dateSortie = dateSortie
        this.identifiantChambre = identifiantChambre
        this.identifiantClient = identifiantClient
    }
}

exports.Reservation = Reservation
