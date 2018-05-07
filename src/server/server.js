// region  Module dependencies.
const http =      require('http');
const VError =    require('verror');
const Promise =   require('bluebird');

const logger =    require('./logger');
const config =    require('./config');
const express =   require('./express').default;
// endregion

let httpServer;

function start(dbConnection) {
	logger.debug('Starting server...');
	const app = express(dbConnection);
	httpServer = http.createServer(app);
	const port = process.env.APP_PORT ? process.env.APP_PORT : config.get('http.port');
	httpServer.listen(port, (err) => {
		return new Promise((resolve, reject) => {
			if (err) { return reject(new VError(err, 'App listen failed')); }
			logger.debug('Http started at %s port.', httpServer.address().port);
			return resolve();
		});
	});
}

function stop() {
	logger.debug('Closing http server...');
	return new Promise((resolve, reject) => {
		httpServer.close((err, result) => {
			if (err) { return reject(new VError(err, 'Http close failed')); }
			logger.debug('Http server closed.');
			return resolve();
		});
	});
}

module.exports = {
	start:  start,
	stop:   stop
};
