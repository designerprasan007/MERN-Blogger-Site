const User = require('../models/UserModel');


const LoginUser = async (req, res) =>{
	const {email, password} = req.body;
	if (!email || !password) return res.status(405).json({success:false, message:'All Fields required'});
	try{
	const user = await User.findOne({email});
	if(!user) return res.status(401).json({success: false, message: 'Email is not registered'})

		const isMatch = await user.Matchpass(password);

		if(!isMatch) return res.status(403).json({success: false, message:'Invalid Password'});

		sendToken(user, 200, res);	
	}
	catch(e){
		res.status(500).json({success:false, message:e.message});
	}
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
	}else{
		res.status(401).json({success:false, message:'Email is already taken'})
	}
}


const UpdateUser = async (req, res) =>{
	// sendToken(req.token,)
	const data = req.body;
	const uploadedfilename = req.file.filename;
	const userdata = {
		address : data.address,
		link: data.userLinks,
		userPic : uploadedfilename,
		_id: data.userId
	}
	console.log(userdata);
	const usrt = await user.findOneAndUpdate({_id:userdata._id}, userdata  )
	res.status(200).json({success:true, data});
}



const sendToken = (user, status, res) => {
	const token = user.getSignedToken();
	const address = user.address ? user.address : '';

	const resUser = {
		_id: user._id,
		username: user.username,
		email: user.email,
		address : address
	};
	res.status(status).json({success:true, user:resUser, token: token});
}

module.exports = {LoginUser, RegisterUser, UpdateUser};