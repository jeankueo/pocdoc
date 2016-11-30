var restify = require("restify");
var cfenv = require("cfenv");
var mongoose = require('mongoose');

var server = restify.createServer();

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.use(restify.CORS({
    origins: ['*'],
    credentials: false,
}));

module.exports = server;

var env = cfenv.getAppEnv();
var PORT = process.env.PORT || 5000;

var dbUri = env.isLocal ? 'mongodb://localhost/db' : env.getServices()["pipeline-db"].credentials.uri;
mongoose.connect(dbUri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
require('./src/routes')(server);

server.listen(PORT, function () {
  console.log('DB Server listening on port ' + PORT + '.');
});