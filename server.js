var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(3000, function(){
    console.log('Access by http://localhost:3000/web/public ...');
});