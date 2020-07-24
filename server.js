var http = require('http');
var url = require('url');

var server = http.createServer(function (req, res) {
    var page = url.parse(req.url).pathname;
    console.log(page);
    res.writeHead(200, {"Content-Type": "text/plain"});
    if (page == '/') {
        res.write('Et ça fait des caca papillons');
    } else if (page == '/uno') {
        res.write('Va t en !');
    } else if (page == '/dos/tres') {
        res.write('Je rigole, bienvenue !');
    } else  {
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.write('erreur 404');
    }
    res.end();
});

console.log("serveur lancé")
server.listen(8080);
