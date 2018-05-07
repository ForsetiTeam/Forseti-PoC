// region Module dependencies.
const expressValidator =      require('express-validator');
const mongoose =              require('mongoose');
const _ =                     require('lodash');
const validator =             require('validator');
const bcrypt =                require('bcryptjs-then');
/*
const userService =           require('../services/userService');
const notificationService =   require('../services/notificationService');
const compareIds =            require('../services/sanitizeService').compareIds;*/

const User =                  mongoose.model('User');
// endregion

function isContains(item, targetItems) {
	if (!item) {
		return false;
	}
	return _.includes(targetItems, item);
}

function isCustomEmail(email) {
	return /^[-a-zA-Z0-9!#$%&'*+\/=?^_`{|}~\-\.]+@[a-z0-9.\-]+$/.test(email);
}

async function isUserExistsByEmail(email) {
	if (!email) return Promise.resolve();

	const emailStatus = await userService.getEmailStatus(email);

	switch (emailStatus) {
		case 'notExists':
			return Promise.resolve();
		case 'notConfirmed':
			await User.remove({ email });
			return Promise.resolve();
		case 'confirmed':
			return Promise.reject();
	}
}

function isPassword(password) {
	return /(?=.*[0-9])(?=.*[а-яёa-z])(?=.*[A-ZА-ЯЁ])[0-9a-zA-Z.,';\]\[{}:"<>?!@#$%^&*()_\-+=|\/№А-Яа-яЁё]{8,}/.test(password);
}

function isLengthArray(array, length) {
	return array.length <= length;
}

function isExist(items, Model, addConditions) {
	if (!items) { return false; }
	if (!_.isArray(items)) { items = [items]; }
	let ids;
	if (_.isPlainObject(items[0])) {
		ids = _.map(items, '_id');
	} else {
		ids = items;
	}
	return Promise.resolve()
		.then(() => {
			const conditions = {_id: {$in: ids}};
			if (Model.schema.paths.archivedDate) { conditions.archivedDate = {$exists: false}; }
			if (Model.schema.paths.inMaking)     { conditions.inMaking = false; }
			if (addConditions)                   { _.assignIn(conditions, addConditions); }
			const isMongoIds = _.some(ids, (id) => { return validator.isMongoId(id); });
			if (!isMongoIds) { return Promise.reject(); }
			return Model.count(conditions)
				.then((count) => {
					if (items.length !== count) { return Promise.reject(); }
					return Promise.resolve();
				});
		});
}

function isArray (value) {
	return Array.isArray(value);
}

function isString (value) {
	return typeof value === 'string';
}

function isMineProject(id, Model, userId) {
	if (!id || !validator.isMongoId(id)) { return false; }

	const conditions = {
		_id:          id,
		owner:        userId,
		archivedDate: { $exists: false }
	};

	return Model.count(conditions)
		.then((count) => Boolean(count) ? Promise.resolve() : Promise.reject());
}

function isCustomPhone(phone) {
	return /^\d{0,15}$/.test(phone);
}

function notAdded(phone, user, id) {
	if (!user || !phone) return false;

	const isAdded = user.phones.some((userPhone) => {
		if (!id || !compareIds(userPhone._id, id)) {
			return _.isEqual(userPhone.phone, phone);
		}
	});

	return !Boolean(isAdded);
}

function isSamePassword(oldPassword, user) {
	if (!user) {
		return Promise.reject();
	}

	return bcrypt.compare(oldPassword, user.password)
		.then((valid) => {
			if (valid) return Promise.resolve();

			return Promise.reject();
		});
}

module.exports = () => {
	return expressValidator({
		customValidators: {
			isContains:           isContains,
			isCustomEmail:        isCustomEmail,
			isUserExistsByEmail:  isUserExistsByEmail,
			isPassword:           isPassword,
			isLengthArray:        isLengthArray,
			isExist:              isExist,
			isArray:              isArray,
			isString:             isString,
			isMineProject:        isMineProject,
			isCustomPhone:        isCustomPhone,
			notAdded:             notAdded,
			isSamePassword:       isSamePassword
		}
	});
};
