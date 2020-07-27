// Nous programmons le logiciel de gestion de gestion d'une animalerie
// Besoin:
//   - identififier chaque animal par sa race, en précisant les caractéristique propre à chaque race (attribut et fonctions), par exemple, un Chien aura un nom, un age, un propriétaire, sera stérilisé ou pas, ect...
// Construction:
//   - on aura donc une classe de base Animal (choisissez l'animal que vous voulez faire) qui contiendra les caractéristiques communs à tout nos animaux
//   - puis des classes enfant pour chaque race d'animal avec ses propriétés propres.

class raceAnimal{
  constructor (nom, age, proprietaire, flatulance, obeissant){
    this.nom = nom
    this.age = age
    this.proprietaire = proprietaire
    this.flatulance = flatulance
    this.obeissant = obeissant
  }

  estUnPug(){
    return this.age<10 && this.flatulance === true
  }

  estUnChowChow(){
    return this.obeissant === false && this.proprietaire = "moi"
  }
}

let estUnChowChow = new raceAnimal ("coco", "12","moi", false, false )
console.log(estUnChowChow);

let estUnPug = new raceAnimal ("porco", "2", undefined ,true, true)
console.log(estUnPug);
