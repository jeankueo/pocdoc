var odata = require("node-odata");
var cfenv = require("cfenv");

var env = cfenv.getAppEnv();
var PORT = process.env.PORT || 5000;
var dbUri = env.isLocal ? 'mongodb://localhost/db' : env.getServices()["pipeline-db"].credentials.uri;

var server = odata(dbUri);
require('./src/routes')(server);

server.listen(PORT, function () {
  console.log('Odata service has started on port ' + PORT + '.');
});