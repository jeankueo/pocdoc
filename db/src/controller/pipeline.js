var Model = require('../model/pipeline');

module.exports = {
	get: get,
	post: post,
	del: del,
	getByKey: getByKey,
	put: put
};

function get (request, response, next) {
	Model.find({}, function (err, docs) {
		if (err) {
			return _errorResponse(response, 404, err, next);
		}
		response.send(200, docs);
		return next();
	});
};

function getByKey(request, response, next) {
    Model.find(
       { 'key': request.params.key },
        function (err, docs) {
            if (err) { 
                return _errorResponse(response, 404, err, next);
            }
            if (docs.length === 0) {
                response.send(404);
            } else {
                response.send(200, _docsToRepresentation(docs));
            }
            return next();
    });
};

function put(request, response, next) {
    Model.find(
       { 'key': request.params.key },
        function (err, docs) {
            if (err) { 
                return _errorResponse(response, 404, err, next);
            }
            if (docs.length === 0) {
                response.send(404);
            } else {
                response.send(200, _docsToRepresentation(docs));
            }
            return next();
    });
};

function post (request, response, next) {
	if (!request.body) {
		return _errorResponse(response, 400, "Come on, you need a request body!", next);
	}

	var body = (typeof (request.body) === "string") ?
		JSON.parse(request.body) :
		request.body;

	if (!body || !body.name) {
		return _errorResponse(response, 400, "You need name friend.", next);
	}

	var newPipeline = new Model(body);
	newPipeline.save(function (err, row) {
		if (err) {
			return _errorResponse(response, 500, err, next);
		}
		response.header("Location", "/" + body.name);
		response.send(201);
		return next();
	});
};

function del(request, response, next) {
     Model.find(
       { 'key': request.params.key },
        function (err, docs) {
            if (err) { 
                return _errorResponse(response, 500, err, next);
            }
            
    }).remove(function() {
        response.send(204);
        return next();
    });
}

function _errorResponse(response, status, message, next) {
	console.error("ERROR " + message);
	response.send(status, message);
	return next();
};

function _docsToRepresentation(docs) {
    if (Array.isArray(docs) && docs.length === 1) {
        return docs[0];
    }
    return docs;
}