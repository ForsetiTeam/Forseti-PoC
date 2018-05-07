import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	username: 			  { type: String, required: true },
	email:                { type: String, required: true },
	password:             { type: String, required: true },
	passwordHash:         { type: String }, // hash of new password
}, {
	strict:     true,
	versionKey: false,
	collection: 'users'
});

const Users = mongoose.model('User', userSchema);

export default Users;
