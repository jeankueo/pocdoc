var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(9876, function(){
    console.log('Access by http://localhost:9876/app/openui5 ...');
});