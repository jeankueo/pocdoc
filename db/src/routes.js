module.exports = function(server) {
	server.resource('pipeline', require('./schema/pipeline'));
}