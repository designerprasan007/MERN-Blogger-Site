const User = require('../models/UserModel');


const LoginUser = async (req, res) =>{
	res.send('from controller');
}

const RegisterUser = async (req, res) =>{
	const {username, email, password, confPassword} = req.body;
	if(!username || !email || !password || !confPassword ) return res.status(405).json({success: false, message: 'All Fields Required'})
	if (password !== confPassword) return res.status(405).json({success: false, message: 'Password not match'});
	
	const user = await User.findOne({email});
	if(!user){
		try{
			const user = await User.create({username, email, password});
			sendToken(user, 200, res);
		}
		catch(e){
			res.status(405).json({success: false, message:'failed to insert'})
		}
	}
}


const sendToken = (user, status, res) => {
	const token = user.getSignedToken();
	res.status(status).json({success:true, user:user, token: token});
}

module.exports = {LoginUser, RegisterUser};