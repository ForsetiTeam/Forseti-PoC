// region Module dependencies.
const express =           require('express');
const morgan =            require('morgan');
const bodyParser =        require('body-parser');
const helmet =            require('helmet');
const path =              require('path');
const session =           require('express-session');
const cookieParser =      require('cookie-parser');

const logger =            require('./logger');
const config =            require('./config');
const routers =           require('./routers');
const responses =         require('./middlewares/responses');
const customValidators =  require('./middlewares/customValidators');
const passport =          require('./middlewares/passport');

// endregion

// region Dev
const allowLocalAdminPanelRequests = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

	next();
};

const initDevMiddleware = (app) => {
	if (process.env.NODE_ENV === 'dev') app.use(allowLocalAdminPanelRequests);
};
// endregion

/**
 * Initialize local constiables
 */
const initLocalconstiables = (app) => {
	app.use((req, res, next) => {
		res.locals.host = `${req.protocol}://${req.hostname}`;
		res.locals.url = `${req.protocol}://${req.headers.host}${req.originalUrl}`;
		next();
	});
};


/**
 * Initialize application middleware
 */
const initMiddleware = (app) => {
	app.use(morgan('[:date[clf]] - ":method :url" :status :response-time ms - :res[content-length]', {stream: logger.stream}));

	app.use((req, res, next) => {
		const originalUrl = req.originalUrl;
		switch (true) {
			case /\/api\/files.*/.test(originalUrl):
				return bodyParser.json({limit: config.get('uploadChunkSize') * 2})(req, res, next);
			default:
				return bodyParser.json()(req, res, next);
		}
	});
	app.use(cookieParser());
	app.use((err, req, res, next) => {
		return res.status(400).json({message: 'Invalid JSON string.'});
	});
	app.use(responses());
	app.use(customValidators());
	passport(app);
};

/**
 * Configure Express session
 */
const initSession = (app) => {
	app.use(
		session({
			saveUninitialized: true,
			resave: true,
			secret: config.get('session.secret'),
			cookie: { maxAge: config.get('session.maxAge') }
		})
	);
};

/**
 * Configure Helmet headers configuration
 */
const initHelmetHeaders = (app) => {
	// Use helmet to secure Express headers
	const SIX_MONTHS = 15778476000;
	app.use(helmet.frameguard());
	app.use(helmet.xssFilter());
	app.use(helmet.noSniff());
	app.use(helmet.ieNoOpen());
	app.use(helmet.hsts({
		maxAge: SIX_MONTHS,
		includeSubdomains: true,
		force: true
	}));
	app.disable('x-powered-by');
};

/**
 * Configure the modules static routes
 */
const initModulesClientRoutes = (app) => {
	app.use('/data', express.static(path.resolve('./public/userData')));
	app.use('/', express.static(path.resolve('./public')));
	//app.use(require('./controllers/reactController'));
};

/**
 * Configure the modules server routes
 */
const initModulesServerRoutes = (app) => { routers(app); };

/**
 * Configure error handling
 */
const initErrorRoutes = (app) => {
	app.use((err, req, res, next) => {
		if (!err) { return next(); }

		const result = {
			status: 500,
			message: err.message || 'Error'
		};
		logger.error('Unexpected Error in controller');
		logger.error(err.stack || err);
		res.statusCode = result.status;
		return res.json(result);
	});
};

const notFoundRoutes = (app) => {
	app.use('/api/*', (req, res) => {
		res.responses.notFoundResource('Endpoint not found');
	});
	if (config.get('env') === 'dev-local') {
		app.use((req, res) => { res.sendFile('index.html', {root: path.resolve(__dirname, '../../', 'public')}); });
	}
};

const initRobots = (app) => {
	app.get('/robots.txt', (req, res) => {
		res.type('text/plain');
		res.sendFile(path.join(__dirname, 'robots.txt'));
	});
};

/**
 * Initialize the Express application
 */
const init = () => {
	// Initialize express app
	let app = express();

	// Initialize robots.txt
	initRobots(app);

	// Initialize local constiables
	initLocalconstiables(app);

	// Initialize Express session
	initSession(app);

	// Initialize Express middleware
	initMiddleware(app);

	// Initialize middleware for dev environment
	initDevMiddleware(app);

	// Initialize Helmet security headers
	initHelmetHeaders(app);

	// Initialize modules server routes
	initModulesServerRoutes(app);

	// Initialize error routes
	initErrorRoutes(app);

	// Initialize notFound routes
	notFoundRoutes(app);

	// Initialize modules static client routes, before session!
	initModulesClientRoutes(app);

	return app;
};

export default init;
