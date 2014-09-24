var net = require('net'),
	Util = require('../utils/utils.js'),
	server,
	loki,
	fs = require('fs'),
	protocol = require('./protocol/protocol.js');

function lokiServer(options) {
	this.logging = false;
	if (options.hasOwnProperty('logfile')) {
		this.logging = true;
		this.logfile = options.logfile;
	}
	var confirmLoad = function () {
			Utils.log('Database successfully loaded');
		},
		loki = new loki(options.filename),
		Protocol = new protocol(loki),
		server = new net.Server(function (socket) {

			socket.on('data', function (data) {
				var obj = Util.parse(data.toString());
				if (obj.status === 'ok') {

				}
				if (obj.status === 'fail') {

				}
			});

			socket.on('error', function (err) {

			});

			socket.on('close', function () {

			});
		});

	var port = options.port || '47134';
	server.listen(port, function () {
		Util.log('Listening to ' + port);
	});
	if (fs.exists(options.filename, function (err) {
		if (err) {
			return;
		}
		loki.loadDatabase(confirmLoad);
	}));
}

module.exports = lokiServer;