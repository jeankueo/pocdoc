var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname + "/..")).listen(7654, function(){
    console.log('Access by http://localhost:7654/mix-es5-poc/public ...');
});