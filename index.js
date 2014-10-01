var lokiServer = require('./server/server.js'),
	loki = require('lokijs'),
	options = {},
	server,
	i = 2,
	len = process.argv.length;

if (process.argv.length == 2) {
	console.log('Usage: blabla...');
}
if (process.argv.length > 2) {
	for (i; i < len; i += 1) {

		switch (process.argv[i]) {
		case '-p':
		case '--port':
			options.port = process.argv[i + 1];
			i += 1;
			break;
		case '-f':
		case '--filename':
			options.filename = process.argv[i + 1];
			i += 1;
			break;
		default:
			console.log('unrecognized option ' + process.argv[i]);
			break;
		}
	}
	console.log(options);
	server = new lokiServer(loki, options);
	server.start();
}