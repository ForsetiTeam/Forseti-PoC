const mongoose = require('mongoose');

const versionSchema = new mongoose.Schema({
	createDate:   { type: Date,   required: true, 'default': Date.now },
	version:      { type: String, required: true },
	description:  { type: String }
}, {
	strict:     true,
	versionKey: false,
	collection: 'versions'
});

module.exports.Version = mongoose.model('Version', versionSchema);
