const redis = require('redis')
const accessBdd = redis.createClient()

function sendToRedis(reservation) {
    accessBdd.hset(`reservation:${reservation.numeroReservation}`,
        'numeroReservation', newreservation.numeroReservation,
        'dateEntree', newreservation.dateEntree,
        'dateSortie', newreservation.dateSortie,
        'identifiantChambre', newreservation.identifiantChambre,
        'identifiantClient', newreservation.identifiantClient,
        (err, res) => {
            if (err)
                throw err
        }
    )
}

function getFromRedis(numeroReservation, callback) {
    accessBdd.hgetall(`reservation:${numeroReservation}`, callback)
}

exports.sendToRedis = sendToRedis;
exports.getFromRedis = getFromRedis;
exports.getAllFromRedis = getAllFromRedis;
