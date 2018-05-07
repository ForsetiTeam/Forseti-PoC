// region Module dependencies.
const passport =        require('passport');
const LocalStrategy =   require('passport-local').Strategy;
const JwtStrategy =     require('passport-jwt').Strategy;
const bcrypt =          require('bcryptjs-then');
const VError =          require('verror');
const mongoose =        require('mongoose');

const config =          require('../config');

const User = mongoose.model('User');
// endregion

module.exports = (app) => {
	// Serialize sessions
	passport.serializeUser((user, done) => {
		return done(null, user._id);
	});

	// Deserialize sessions
	passport.deserializeUser((_id, done) => {
		User.findOne({_id}, { password: false })
			.then((user) => {
				return done(null, user);
			})
			.catch((err) => {
				return done(err);
			});
	});

	// Basic стратегия
	passport.use(new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password'
		},
		(email, password, next) => {
			return User.findOne({email: email}).lean()
				.then((user) => {
					if (!user) {
						return next(null, false, {message: 'Неверный email или пароль.'});
					}
					if (user.archived) {
						return next(null, false, {message: 'Пользователь архивирован.'});
					}
					if (!user.emailConfirmed) {
						return next(null, false, {message: 'Пользователь не подтвердил e-mail.'});
					}
					return bcrypt.compare(password, user.password)
						.then((res) => {
							if (!res) {
								return next(null, false, {message: 'Неверный email или пароль.'});
							}
							delete user.password;
							return next(null, user);
						});
				})
				.catch((err) => {
					return next(new VError(err));
				});
		}
	));

	function cookieExtractor() {
		return (req) => {
			let token = null;

			if (req && req.cookies && req.cookies['jwt']) {
				token = req.cookies['jwt'];
			}

			if ((typeof token === 'undefined' || token === null) && req && req.headers && req.headers.authorization) {
				token = req.headers.authorization;
			}

			return token;
		};
	}

	// Add passport's middleware
	app.use(passport.initialize());
	app.use(passport.session());
};
