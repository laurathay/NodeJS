class Chambre{
    constructor (identifiantChambre, numeroChambre, prix, nbLit, possedeSalleDeBain, balcon, terrasse, clim, tv, petitDejeuner, prixPetitDejeuner, accepteAnimaux, accepteEnfant, etage, estDisponible, litKingSize, optionPetalDeRose{
    this.identifiantChambre = identifiantChambre //UUID
    this.numeroChambre = numeroChambre //Number
    this.prix = prix //Number
    thi.nbLit = nbLit // Number
    this.possedeSalleDeBain =  possedeSalleDeBain //Boolean
    this.balcon = balcon // Boolean
    this.terrasse = terrasse // Boolean
    this.clim = clim //Boolean
    this.tv = tv // Boolean
    this.petitDejeuner = petitDejeuner // Boolean
    this.prixPetitDejeuner = prixPetitDejeuner // Number
    this.accepteAnimaux = accepteAnimaux // Boolean
    this.accepteEnfant = accepteEnfant // Boolean
    this.etage = etage // Nombre
    this.estDisponible = estDisponible // Boolean
    this.litKingSize = litKingSize // Boolean
    this.optionPetalDeRose = optionPetalDeRose // Boolean
  }

  isLyndaProof() {
      return this.clim && this.optionPetalesDeRose
  }
}

class Reservation{
    constructor (numeroReservation, dateEntree, dateSortie, numeroChambre, numeroClient){
    this.numeroReservation = numeroReservation // UUID
    this.dateEntree = dateEntree // Date()
    this.dateSortie = dateSortie // Date()
    this.numeroChambre = numeroChambre // identifiant chambre
    this.numeroClient = numeroClient // identifiant client
  }
}

class Client{
  constructor(identifiantClient, nom, prenom, adresse, email){
    identifiantClient = identifiantClient // UUID
    this.nom = nom // string
    this.prenom = prenom // string
    this.addresse = addresse // string
    this.email = email // string
  }
  //cloner les données de redis dans un nouvel objet
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


//pour pouvoir les importer dans d'autres fichiers
exports.Chambre = Chambre
exports.Reservation = Reservation
exports.Client = Client
