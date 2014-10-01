var net = require('net'),
	Util = require('../utils/utils.js'),
	server,
	fs = require('fs'),
	Protocol = require('../protocol/protocol.js'),
	protocol;

function lokiServer(loki, options) {

	this.logging = false;
	if (options.hasOwnProperty('logfile')) {
		this.logging = true;
		this.logfile = options.logfile;
	}
	var confirmLoad = function () {
			Util.log('Database successfully loaded');
		},
		db = new loki(options.filename),
		protocol = new Protocol(db);
	Util.info('ENV', db.ENV);
	if (fs.exists(options.filename, function (exists) {
		if (exists) {
			db.loadDatabase(confirmLoad);
			return;
		}
		db.addCollection('users', 'User');
	}));

	// this is to enable logging in protocol.js
	db.logger = Util;

	server = new net.Server(function (socket) {

		socket.on('data', function (data) {
			Util.log(data.toString());
			var obj = Util.parse(data.toString());
			if (obj.status === 'ok') {
				var result = protocol.process(obj.data);
				Util.log('Result is', result);
				socket.write(JSON.stringify(result), 'utf8');
			}
			if (obj.status === 'fail') {
				socket.write('fail...', 'utf8');
			}
		});

		socket.on('error', function (err) {

		});

		socket.on('close', function () {

		});
	});

	this.start = function () {
		var port = options.port || '47134';
		server.listen(port, function () {
			Util.log('Listening to ' + port);
		});
	};

	this.stop = function () {
		server.close();
	};

}

module.exports = lokiServer;