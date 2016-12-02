'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var bodyParser = require('body-parser');
var cfenv = require("cfenv");

// determine mongodb url by environment
var env = cfenv.getAppEnv();
var dbUri = env.isLocal ? 'mongodb://localhost/db' : env.getServices()["pipeline-db"].credentials.uri;

// create loopback
var app = module.exports = loopback();
// parse application/json
app.use(bodyParser.json());

// config port
app.set("port", process.env.PORT || 5000);
// config mongodb datasource
app.dataSource('mongodb', {
    "url": dbUri,
    "connector": "mongodb"
});
// config model
app.model(loopback.createModel(require('../schema/pipeline')), {
  dataSource: 'mongodb',
  public: true
});

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
