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
    return this.obeissant === false && this.proprietaire === "moi"
  }
}

class Chat extends raceAnimal{ //premiere lettre en majuscule pour la class
  constructor (nom, age, proprietaire, griffe, autoClean){
    super (nom, age, proprietaire);
    this.griffe = griffe
    this.autoClean = autoClean
  }

  estUnChat(){
    return this.griffe === true && this.autoClean === true
  }
}

class Hamster extends raceAnimal{
  constructor (nom, age, proprietaire, mangeGraines, tourneEnRond){
    super (nom, age, proprietaire);
    this.mangeGraines = mangeGraines
    this.tourneEnRond = tourneEnRond
  }

  estUnHasmter(){
    return this.mangeGraines === true && this.tourneEnRond === true
  }
}

let estUnChowChow = new raceAnimal ("coco", "12","moi", false, false )
console.log(estUnChowChow);

let estUnPug = new raceAnimal ("porco", "2", undefined ,true, true)
console.log(estUnPug);

let chat = new Chat ("alix", "15", "moi", true, true) // a remodifier car on appelle le constructor donc Chat
console.log (chat.estUnChat()); // pareil à rappeler chat.estUnChat

let hamster = new Hamster ("hamtaro", "1", "moi", true, true) //
console.log (hamster.estUnHasmter());
