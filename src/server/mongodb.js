// region  Module dependencies.
const mongoose =    require('mongoose');
const VError =      require('verror');
const Promise =     require('bluebird');

mongoose.Promise = Promise;

const logger =      require('./logger');
const config =      require('./config');
const migrations =  require('./migrations');
// endregion.

function dropDatabase() {
	logger.info('Database dropped');
	return mongoose.connection.db.dropDatabase();
}

function mainConnect() {
	const fnCallDropDatabase = () => { return config.get('db.dropDatabaseAlways') ? dropDatabase() : null; };
	const fnCallMigration = () => { return config.get('db.autoApplyMigrations') ? migrations.migrateToActual() : null; };
	return connect(fnCallDropDatabase, fnCallMigration);
}

function connect(fnCallDropDatabase, fnCallMigration) {
	fnCallDropDatabase = fnCallDropDatabase || (() => {});
	fnCallMigration = fnCallMigration || (() => {});
	logger.debug('Init database...');
	//mongoose.Promise = global.Promise;
	mongoose.set('debug', config.get('db.debug'));
	mongoose.connection.on('error', (err) => { logger.error(new VError(err)); });
	return new Promise((resolve, reject) => {
		let mongooseThenable;
		mongoose.connection.on('open', () => {
			logger.debug('Connected to MongoDB');
			return resolve({mongooseThenable: mongooseThenable});
		});
		mongoose.connection.once('error', (err) => { return reject(new VError(err)); });
		mongooseThenable = mongoose.connect(config.get('db.uri'), { useMongoClient: true });
	})
		.then((db) => {
			return Promise.resolve()
				.then(fnCallDropDatabase)
				.then(fnCallMigration)
				.then(() => { return db.mongooseThenable.connection; })
				.catch((err) => { return Promise.reject(new VError(err)); });
		});
}

function disconnect() {
	logger.debug('Closing mongodb connection...');
	return mongoose.disconnect()
		.then(() => { return logger.debug('Mongodb connection closed.'); })
		.catch((err) => { return Promise.reject(new VError(err, 'Mongo connection close failed')); });
}

module.exports = {
	mainConnect:  mainConnect,
	connect:      connect,
	disconnect:   disconnect,
	dropDatabase: dropDatabase
};
