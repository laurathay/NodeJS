//Pour définir si un bien immobilier est bien a vendre :
class BienImmobilier{
	constructor (prix, type, propriétaire){
		this.prix = prix
		if(type === ""){
			throw "erreur, le type est vide."
		}
		this.type= type
		this.proprietaire = propriétaire
	}

// si le prix est supérieur a 0 et si le propriétaire n'est pas defini
	estAVendre(){
		return this.prix > 0 && this.proprietaire === undefined
	}

}
//on fait un heritage, pour eviter de se repeter si on a plusieurs class on rajoute extends et super
class Immeuble extends BienImmobilier{ //pour appeler la class mere
  constructor(prix, type, proprietaire, nbALouer, nbAVendre, nbEtage){
    super(prix, type, proprietaire) //appeler le constructor de la class mere
    this.nbALouer = nbALouer
    this.nbAVendre = nbAVendre
    this.nbEtages = nbEtages
  }
}

class Maison extends BienImmobilier{
  constructor (prix, type, proprietaire, nombre_chambre, possedeCuisine){
    super(prix, type, proprietaire);
    this.nombre_chambre = nombre_chambre
    this.possedeCuisine = possedeCuisine
  }

  estAVendre(){
    return this.prix>0 && this.proprietaire === undefined
  }
}

let immeuble = new Immeuble(100000, "appartement", "moi", undefined, undefined, 10, 20, 30)
let immeubleAVendre = new Immeuble(100000, "appartement")
let maison = new Maison(100000, "maison", undefined, 3, true)
console.log(immeuble.estAVendre())
console.log(immeubleAVendre.estAVendre())
