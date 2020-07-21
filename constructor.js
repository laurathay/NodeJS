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

let immeuble = new BienImmobilier (100000, “appartement”, “moi”)
let immeubleAVendre = new BienImmobilier (100000, "appartement")
console.log(immeuble.estAVendre());
console.log (immeubleAVendre.estAVendre());
