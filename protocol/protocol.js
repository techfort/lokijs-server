var ops = require('./operations.js');

function async(func, callback) {
	setTimeout(function () {
		func.apply();
		callback.apply();
	}, 1);
}

function LokiProtocol(db) {
	var self = this;
	this.process = function (message, callback) {
		var coll = message.collection,
			op = parseInt(message.op),
			obj = message.obj,
			result;
		switch (op) {
		case ops.OP_QUERY:
			async(function () {
				result = (db.getCollection(coll)).insert(obj);
			}, function () {

			});
			//async(db.saveToDisk, null);
			return result;
			break;
		case ops.OP_QUERY:
			break;
		case ops.OP_UPDATE:
			break;
		case ops.OP_UPDATE_ONE:
			break;
		case ops.OP_UPDATE_MANY:
			break;
		case ops.OP_INSERT:
			db.logger.info('OP_INSERT', obj);
			result = (db.getCollection(coll)).insert(obj);
			//async(db.saveToDisk, null);
			return result;
			break;
		case ops.OP_DELETE:
			break;
		case ops.OP_SOFT_DELETE:
			break;
		case ops.OP_CREATE_VIEW:
			break;
		case ops.OP_CREATE_COLLECTION:
			db.logger.info('OP_CREATE_COLLECTION', obj);
			db.addCollection(obj.collection, obj.objType);
			return {
				status: 'ok',
				message: 'collection created'
			};
			break;
		}
	};
}

module.exports = LokiProtocol;