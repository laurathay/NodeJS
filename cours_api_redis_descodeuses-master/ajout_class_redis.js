const {Chambre, Client, Reservation} = require('./model')
const utils = require('./utils')

let clientHotel = new Client(utils.uuidv4(), 'lelu', 'awen', '11 rue charle de gaule', 'test@test.test')
console.log(clientHotel)
Client.sendToRedis(clientHotel)

Client.getFromRedis(clientHotel.identifiantClient, (err, res) => {
    let clientHotel = Client.fromRedis(res)
})
