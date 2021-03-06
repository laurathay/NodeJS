// on créer une variable rawJson qui contient un exemple de donnée au format JSON
let rawJson = "{\"immeuble\":[{\"numero\": 12, \"prix\": 40000, \"cuisine\": true}, {\"numero\": 13, \"prix\": 30000, \"cuisine\": true}, {\"numero\": 14, \"prix\": 2000, \"cuisine\": false}]}\n"
//on utilise ensuite la méthode JSON.parse() en lui passant en paramètre rawJson afin de convertir la chaîne de caractère en objet javascript exploitable.
let data = JSON.parse(rawJson)
console.log(data.immeuble)
// on peut ensuite itérer sur notre tableau d'élément avec un foreach et accéder à chaque propriété de cet élément.
for (const appartement of data.immeuble){
    console.log("prix: " + appartement.prix)
    console.log("numéro: " + appartement.numero)
    console.log("cusine: " + appartement.cuisine)
    console.log("-----------")
}
