var pipelineController = require('./controller/pipeline');

module.exports = function(server) {
    server.get('/api/pipeline', pipelineController.get);				// query
    server.post('/api/pipeline', pipelineController.post);				// create & update
    
    server.get('/api/pipeline/:key', pipelineController.getByKey);		// query
    server.put('/api/pipeline/:key', pipelineController.put);			// ?
    server.del("/api/pipeline/:key", pipelineController.del);			// delete
}