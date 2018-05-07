// region  Module dependencies.
const Promise =   require('bluebird');

const logger =    require('./logger');
const config =    require('./config');
// endregion.

require('babel-core/register');
// ['.css', '.less', '.sass', '.ttf', '.woff', '.woff2'].forEach((ext) => require.extensions[ext] = () => {});
require('babel-polyfill');

function start() {
	// Init models
	require('./models');
	global.Promise = Promise;

	const mongodb = require('./mongodb');
	const server = require('./server');

	logger.debug('Starting application...');
	logger.debug(`NODE_ENV: ${config.get('env')}`);
	return mongodb.mainConnect()
		.then((dbConnection) => {
			const serverPromise = server.start(dbConnection);

			return Promise.all([ serverPromise ]);
		})
		.then(() => logger.info('Application started.'));
}

// Start application
start()
	.catch((err) => {
		logger.error(err);
		return process.exit(1);
	});

module.exports = {
	start: start
};
