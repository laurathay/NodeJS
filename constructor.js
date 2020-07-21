class BienImmobilier{
	constructor (prix, type, propriétaire){
		this.prix = prix
		if(type === ""){
			throw "erreur, le type est vide."
		}
		this.type= type
		this.proprietaire = propriétaire
	}

	estAVendre(){
		return prix > 0 && proprietaire !== undefined
	}
	
}

let immeuble = new BienImmobilier (100000, “appartement”, “moi”)
console.log(immeuble);
