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
		switch (message) {
		case 1000:
			var coll = message.collection,
				obj = message.obj;
			async(function () {
				(db.getCollection(coll)).insert(obj);
			}, callback);

			break;
		case 2000:
			break;
		case 2001:
			break;
		case 2002:
			break;
		case 3000:
			break;
		case 4000:
			break;
		case 4001:
			break;
		case 5000:
			break;
		}
	};
}