var pipelineController = require('./controller/pipeline');

module.exports = function(server) {
    server.get('/pipeline', pipelineController.get);					// query
    server.get('/pipeline/:key', pipelineController.getByKey);		// query
    server.put('/pipeline/:key', pipelineController.put);			// ?
    server.post('/pipeline', pipelineController.post);				// create & update
    server.del("/pipeline/:key", pipelineController.del);			// delete
}