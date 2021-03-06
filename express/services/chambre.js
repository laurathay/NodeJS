const redis = require('redis')
const {promisify} = require('util')
const accessBdd = redis.createClient()

const {Chambre} =

function sendToRedis(newChambre) {
    accessBdd.hset(`chambre:${newChambre.identifiantChambre}`,
        'identifiantChambre', newChambre.identifiantChambre,
        'numeroChambre', newChambre.numeroChambre,
        'prix', newChambre.prix,
        'nbLit', newChambre.nbLit,
        'possedeSalleDeBain', newChambre.possedeSalleDeBain,
        'balcon', newChambre.balcon,
        'terrasse', newChambre.terrasse,
        'clim', newChambre.clim,
        'tv', newChambre.tv,
        'petitDejeuner', newChambre.petitDejeuner,
        'prixPetitDejeuner', newChambre.prixPetitDejeuner,
        'accepteAnimaux', newChambre.accepteAnimaux,
        'accepteEnfant', newChambre.accepteEnfant,
        'etage', newChambre.etage,
        'estDisponible', newChambre.estDisponible,
        'litKingSize', newChambre.litKingSize,
        'optionPetalesDeRose', newChambre.optionPetalesDeRose,
        (err, res) => {
            if (err)
                throw err
        })
}

function getFromRedis(identifiantChambre, callback) {
    accessBdd.hgetall(`chambre:${identifiantChambre}`, callback)
}
