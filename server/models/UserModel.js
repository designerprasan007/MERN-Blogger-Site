const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcryt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
	username: String,
	email: String,
	password: String,
	userId: String,
	userPic: String,
	address: String,
	userLinks:[ String]
});

UserSchema.methods.getSignedToken = function(){
	return jwt.sign({id: this._id}, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c')
}

UserSchema.pre('save', async function(next){
	if(!this.isModified('password')){
		next();
	}
	const salt = await bcryt.genSalt(10);
	this.password = await bcryt.hash(this.password, salt)
	next();
})

UserSchema.methods.Matchpass = async function(password){
	return await bcryt.compare(password, this.password);
}


const User = mongoose.model('user', UserSchema);

module.exports = User; 