// start server
var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname + "/..")).listen(6543, function(){
    console.log('Access by http://localhost:6543/react-babel-poc/public ...');
});