var pipelineController = require('./controller/pipeline');

module.exports = function(server) {
    server.get('/pipeline', pipelineController.get);
    server.get('/pipeline', pipelineController.post);
    // server.get('/links/:title', linkController.getByTitle);
    //server.put('/links/:title', linkController.put);
    // server.del('/links/:title', linkController.del);
}