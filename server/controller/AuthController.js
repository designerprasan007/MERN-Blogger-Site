const User = require('../models/UserModel');
const fs = require('fs');

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
	const data = req.body;
	const uploadedfilename = req.file.filename;
	const _id = data.userId;
	const gotLinks = data.userLinks;
	try{
		const user = await User.findOne({_id});
		if(!user){
			res.status(401).json({success:false, message: 'Unauthorized'});
		}
		else{
			updateUserdata(user, data, uploadedfilename, res);
		}
	}
	catch(err){
		res.status(500).json({success: false, message: err.message});
	}
}

const updateImg = async(req, res) =>{
	const _id = req.user._id;
	const data = req.body;
	const uploadedfilename = req.file.filename;
	try{
		const user = await User.findOne({_id});
		if (!user) return res.status(403).json({success:false, message:'Unauthorized'});
		else {
			const OriginPath = __dirname;
			const pathSplit = OriginPath.split('/controller');
			const path = pathSplit[0] + `/ProfilePic/${user.userPic}`;
			if(user.userPic){
			      if(fs.existsSync(path)){
			        fs.unlink(path,(err)=>{
			            if(err) console.log(err)
			            else{
							updateUserdata(user, data, uploadedfilename, res);
			            }	
			        })
			    }
		    }
		    else{
				updateUserdata(user, data, uploadedfilename);
		    }
		}
	}catch(e){
		res.status(500).json({success:false, message:e});
	}

}


const updateUserdata = async (user, data, uploadedfilename, res) =>{
	user.username = data.username || user.username;
	user.email = data.email || user.email;
	user.password = data.password || user.password;
	user.userId = data._id || user.userId;
	user.userPic = uploadedfilename || user.userPic;
	user.address = data.address || user.address;
	user.userLinks = data.userLinks || [];
	const updatedUser = await user.save();
	sendToken(user, 200, res)
}

const sendToken = (user, status, res) => {
	const token = user.getSignedToken();
	const address = user.address ? user.address : '';

	const resUser = {
		_id: user._id,
		username: user.username,
		email: user.email,
		address : address,
		userLinks: user.userLinks,
		profilePic: user.userPic
	};
	res.status(status).json({success:true, user:resUser, token: token});
}



module.exports = {LoginUser, RegisterUser, UpdateUser, updateImg, sendToken};