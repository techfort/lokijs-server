var Config = require('../config/config.js');

function Utils(debugLevel) {
	var debug = debugLevel || 1,
		self = this;
	this.info = function () {
		if (debug < 4) return;
		console.log.apply(null, Array.prototype.slice.call(arguments));
	}
	this.log = function () {
		if (debug < 3) return;
		console.log.apply(null, Array.prototype.slice.call(arguments));
	};

	this.error = function () {
		if (debug < 2) return;
		console.log.apply(null, Array.prototype.slice.call(arguments));
	}

	this.parse = function (rawJson) {
		var output;
		try {
			output = JSON.parse(rawJson);
			return {
				status: 'ok',
				data: output
			};
		} catch (err) {
			self.log('Parsing bombed out...');
			self.error(err);
			return {
				status: 'fail'
			};
		}
	}
}

module.exports = (new Utils(Config.debugLevel));