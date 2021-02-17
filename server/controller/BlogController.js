const Blog = require('../models/BlogModel');
const User = require('../models/UserModel');

const InsertBlog = async(req, res) =>{
	const data = req.user;
	const adminid = data.userId;
	const blogpic = req.files.map((img) =>{
		return img.filename;
	})
	const blogdata = req.body;
	const {title, content, tags} = blogdata;
	try {
		const blog = await Blog.create({title, content, blogpic, adminid, tags});
		res.status(200).json({success: true, blog})
	} catch(e) {
		console.log(e);
		res.status(500).json({success:false, message:e});
	}
}


const GetUsersAllBlog = async(req, res) =>{
	const data = req.user;
	const {adminid} = data.userId;
	try{
		const blogs = await Blog.findOne(adminid);
		if(!blogs){
			return res.status(200).json({success: true, message:'No Blogs Found'})
		}
		else{
			return res.status(200).json({success: true, blogs})
		}
	}
	catch(e){
		res.status(500).json({success:false, message:e});
	}
} 


const EditBlog = async(req, res) =>{
	// const adminid = req.user.userId;
	const data = req.body;
	console.log(data);
	res.send(data);
	// try{

	// 	const blog = await Blog.
	// }
	// catch(e){
	// 	res.status(500).json({success:false, message: e})
	// }
}


module.exports = {InsertBlog, GetUsersAllBlog, EditBlog};


