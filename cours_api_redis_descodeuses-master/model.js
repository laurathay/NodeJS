const redis = require('redis')

class Chambre {
    constructor(identifiantChambre, numeroChambre, prix, nbLit, possedeSalleDeBain, balcon, terrasse, clim, tele, petitDejeuner, prixPetitDejeuner, accepteAnimaux, accepteEnfant, etage, estDisponible, litKingSize, optionPetalesDeRose) {
        this.identifiantChambre = identifiantChambre
        this.numeroChambre = numeroChambre
        this.prix = prix
        this.nbLit = nbLit
        this.possedeSalleDeBain = possedeSalleDeBain
        this.balcon = balcon
        this.terrasse = terrasse
        this.clim = clim
        this.tele = tele
        this.petitDejeuner = petitDejeuner
        this.prixPetitDejeuner = prixPetitDejeuner
        this.accepteAnimaux = accepteAnimaux
        this.accepteEnfant = accepteEnfant
        this.etage = etage
        this.estDisponible = estDisponible
        this.litKingSize = litKingSize
        this.optionPetalesDeRose = optionPetalesDeRose
    }

    isLyndaProof() {
        return this.clim && this.optionPetalesDeRose
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

class Client {
    constructor(identifiantClient, nom, prenom, addresse, email) {
        this.identifiantClient = identifiantClient
        this.nom = nom
        this.prenom = prenom
        this.addresse = addresse
        this.email = email
    }

    static fromRedis(data) {
        return Object.assign(new Client(), data)
    }

    static sendToRedis(clientHotel) {
        let client = redis.createClient()
        client.hset(`client:${clientHotel.identifiantClient}`,
            "identifiantClient", clientHotel.identifiantClient,
            "nom", clientHotel.nom,
            "prenom", clientHotel.prenom,
            "addresse", clientHotel.addresse,
            "email", clientHotel.email,
            (err, res) => {
                console.log(err)
                console.log(res)
            })
    }

    static getFromRedis(identifiantClient, callback) {
        let client = redis.createClient()
        client.hgetall(`client:${identifiantClient}`, callback)
    }
}

exports.Chambre = Chambre
exports.Reservation = Reservation
exports.Client = Client
