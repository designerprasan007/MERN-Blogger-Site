const User = require('../models/UserModel');

const ProfileView = (req, res, next) =>{
	console.log(req.user + 'this is user');
	const userdata = {
		_id : req.user._id,
		username : req.user.username,
		email: req.user.email,
	}
	res.status(200).json({success: true, data: userdata})
}


module.exports = {ProfileView};