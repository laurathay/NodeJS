class Client {
    constructor(identifiantClient, nom, prenom, addresse, email) {
        this._identifiantClient = identifiantClient
        this._nom = nom
        this._prenom = prenom
        this._addresse = addresse
        this._email = email
    }

    static fromRedis(data) {
        return Object.assign(new Client(), data)
    }
}

exports.Client = Client
