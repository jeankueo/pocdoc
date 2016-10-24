var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname + "/..")).listen(8765, function(){
    console.log('Access by http://localhost:8765/react-poc/public ...');
});