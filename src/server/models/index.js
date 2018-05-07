// NB: require the module before mongoose.model('modelName');
// require once

// region Module dependencies.
const glob = require('glob');
const path = require('path');
// endregion

// Init models
function init() {
	glob.sync(`${__dirname}/*.js`)
		.forEach((file) => {
			require(path.resolve(file));
		});
}

module.exports = init();
