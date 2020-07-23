Le but du devoir est de créer une API REST simple en utilisant le module HTTP de nodeJS, la base de donnée Redis et le module node associé afin de récupérer des données et de les renvoyée au format JSON.

Votre api devra être capable de gérer:
- la consultation, création, modification de chambre
- la consultation, création, modification de client

votre API devra suivre le standard REST et donc utilisez une route par ressource (une route pour gérer les chambre, une route pour gérer les client) ET devra utiliser les types de méthode HTTP (GET / POST / DELETE / PUT / PATCH) afin de savoir quelle opération exécuter sur la ressource.

Elle devra renvoyée les donnée aux format JSON afin qu'elles sois exploitable par un client.

Vous devrez définir vous même les structures de donnée à utiliser dans la base de donnée.
Vous devrez créer une classe javascript pour chaque structure de donnée.

Exemple de structure de donnée:

chambre:
  -numero: identifiant
  -nbLit: number
  -Options: tableau d'objet
    - nom: string
    - prix: nombre
client:
  nom: string
  prenom: string
  sexe: string
  age: number
