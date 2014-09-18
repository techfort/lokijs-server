var net = require('net'),
	server,
	loki,
	lokiServer;

function Logger() {
	var TAG = 'lokijs-server';
	this.log = function () {
		var args = Array.prototype.slice.call(arguments);
		args.forEach(function (msg) {
			console.log(TAG + ':[' + (new Date()).toUTCString() + ']:: ' + msg);
		});
	}
}



lokiServer = function (options) {
	this.logging = false;
	if (options.hasOwnProperty('logfile')) {
		this.logging = true;
		this.logfile = options.logfile;
	}
	var logger = new Logger(),
		loki = new loki(options.filename),
		server = new net.Server(function (socket) {
			socket.on('connect', function () {

			});

			socket.on('data', function (data) {

			});

			socket.on('error', function (err) {

			});

			socket.on('close', function () {

			});
		});

	var port = options.port || '47134';
	server.listen(port, function () {
		logger.log('Listening to ' + port);
	});
}

module.exports = lokiServer;