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


const getAllUsers = async(req, res, next) =>{
	try {
	const users = await User.find().select('-password');
	res.status(200).json({success: true, users})
	} catch(e) {
		console.log(e);
		res.status(500).json({success: false, error: e.message})
	}
}	

module.exports = {ProfileView, getAllUsers};