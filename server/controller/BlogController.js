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
	const adminid = req.user._id;
	const _id = req.body.blogid;
	const data = req.body;
	console.log(data.tags);
	try{
		const blog = await Blog.findOne({$and:[{_id}, {adminid}]}); 
		if(!blog) return res.status(403).json({success:false, message:'No User found'});
		blog.title = data.title || blog.title;
		blog.content = data.content || blog.content;
		blog.tags = data.tags || blog.tags;
		blog.likes = data.likes || blog.likes;
		blog.comments = data.comments || blog.comments;
		blog.adminid = adminid || blog.adminid;

		const updatedUser = await blog.save();
		console.log(blog);
		res.status(200).json({success:true, blog})
	}
	catch(e){
		console.log(e);
		res.send(e);
	}	
}

const DeleteBlog = async(req, res) =>{
	const _id = req.body;
	console.log(_id);
	res.send(_id);
}

module.exports = {InsertBlog, GetUsersAllBlog, EditBlog, DeleteBlog};


