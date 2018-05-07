global.Promise         = require('bluebird');

var webpack            = require('webpack');
var path               = require('path');
var ExtractTextPlugin  = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var publicPath         = '/public/assets';
var cssName            = process.env.NODE_ENV === 'production' ? 'style.css' : 'style.css';
var jsName             = process.env.NODE_ENV === 'production' ? 'bundle.js' : 'bundle.js';

var plugins = [
	new webpack.DefinePlugin({
		'process.env': {
			BROWSER:  JSON.stringify(true),
			NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'dev'),
			NODE_SOCKET_PORT: process.env.NODE_ENV === 'dev'
				? JSON.stringify(process.env.NODE_SOCKET_PORT || 8057)
				: undefined
		}
	}),
	new ExtractTextPlugin(cssName)
]; // meow

if (process.env.NODE_ENV !== 'dev') {
	plugins.push(
		new CleanWebpackPlugin([ 'public/assets/' ], {
			root: __dirname,
			verbose: true,
			dry: false
		})
	);
	plugins.push(new webpack.optimize.DedupePlugin());
	plugins.push(new webpack.optimize.OccurenceOrderPlugin());
}

module.exports = {
	entry: ['babel-polyfill', './lib/client/client.js'],
	debug: process.env.NODE_ENV === 'dev',
	resolve: {
		root:               path.join(__dirname, 'lib', 'client'),
		modulesDirectories: ['node_modules'],
		extensions:         ['', '.js', '.jsx']
	},
	plugins: plugins,
	output: {
		path: __dirname + '/public/assets/',
		filename: jsName,
		publicPath: publicPath
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
			},
			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!less-loader')
			},
			{ test: /\.gif$/, loader: 'url-loader?limit=10000&mimetype=image/gif' },
			{ test: /\.jpg$/, loader: 'url-loader?limit=10000&mimetype=image/jpg' },
			{ test: /\.png$/, loader: 'url-loader?limit=10000&mimetype=image/png' },
			{ test: /\.svg/, loader: 'url-loader?limit=26000&mimetype=image/svg+xml' },
			{ test: /\.(woff|woff2|ttf|eot)/, loader: 'url-loader?limit=1' },
			{ test: /\.jsx?$/, loader: process.env.NODE_ENV !== 'production' ? 'react-hot!babel!eslint-loader' : 'babel', exclude: [/node_modules/, /public/] },
			{ test: /\.json$/, loader: 'json-loader' }

		]
	},
	devtool: process.env.NODE_ENV === 'dev' ? 'source-map' : null,
	devServer: {
		headers: { 'Access-Control-Allow-Origin': '*' },
		stats: 'errors-only'
	},
	//eslint: { configFile: '.eslintrc' }
};
