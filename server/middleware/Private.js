const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');


exports.getPrivateData = async (req, res, next) =>{
	let token;
	if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
		token = req.headers.authorization.split(" ")[1];
	}

	if(!token) return res.status(403).json({success: false, message:"Not Authorized"});

	try {
		const decoded = jwt.verify(token, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c') 
		const user = await User.findById(decoded.id);

		if(!user) return res.status(403).json({success: false, message:"Not Authorized"});
		req.user = user
		next();
	} catch(e) {
		return res.status(401).json({success:false, message:e.message});
	}
}

// exports.destroyToken = async (req, res, next) =>{
// 	// console.log(req.);
// 	let token;
// 		if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
// 			token = req.headers.authorization.split(" ")[1];
// 		}
// 		if (!token) return res.status(403).json({success: false, message: "Not Allowed"});

// 		try{
// 			const decoded = jwt.verify(token, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c') 
// 			if(decoded){
// 				jwt.destroy(token)
// 			}
// 			next();
// 		}
// 		catch(e){
// 			console.log(e);
// 			return res.status(500).json({success: false, message: e.message});
// 		}
// }