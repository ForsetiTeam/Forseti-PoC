// region Module dependencies.
const path =      require('path');
const convict =   require('convict');
// endregion.

const conf = convict({
	env: {
		doc: 'The application environment.',
		'default': 'dev',
		env: 'NODE_ENV',
	},
	db: {
		uri: {
			doc: 'Mongodb connection string',
			format: String, 'default': 'mongodb://127.0.0.1/Forseti',
			env: 'MONGO_URI'
		},
		dropDatabaseAlways: { format: Boolean, 'default': false, env: 'DROP_DATABASE' },
		debug: { format: Boolean, 'default': false }
	},
	http: {
		session: { doc: 'Session type', format: String, 'default': 'memory' },
		serveStatic: { doc: 'Enable processing static content requests', format: Boolean, 'default': true },
		host: {
			doc: 'React fetching host',
			format: String,
			'default': 'http://localhost',
			env: 'APP_HOST'
		},
		port: {
			doc: 'Http listening port',
			format: 'port',
			'default': 80,
			env: 'APP_PORT'
		},
		url: { format: String }
	},
	session: {
		secret: { format: String, 'default': 'xjksxnjzJHDHHD' },
		maxAge: { format: Number, 'default': 300000 }
	},
});

const filePath = path.resolve(__dirname, 'env', `${conf.get('env')}.json`);

conf.loadFile(filePath);
conf.validate();

module.exports = conf;
