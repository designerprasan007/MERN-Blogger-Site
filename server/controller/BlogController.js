const Blog = require('../models/BlogModel');
const User = require('../models/UserModel');


const AllBlogs = async(req, res) =>{
	try{
		const blogs = await Blog.find().populate('comments.commenterId','username userPic').populate('adminid','username userPic');
		res.status(200).json(blogs);
	}
	catch(e){
		console.log(e);
		res.status(500).json({success:false, message:e.message})
	}
}

const InsertBlog = async(req, res) =>{
	const data = req.user;
	const adminid = data._id;
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
	const adminid = data._id;
	try{
		const blogs = await Blog.find({adminid}).populate('adminid','username userPic');
		console.log(blogs);
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
		res.status(200).json({success:true, blog})
	}
	catch(e){
		console.log(e);
		res.send(e);
	}	
}

const DeleteBlog = async(req, res) =>{
	const blogid = req.body.blogid;
	const  adminid = req.user._id;
	try{
		const blog = await Blog.findOne({$and:[{_id:blogid}, {adminid}]});
		res.status(200).json({success: true, blog});
	}
	catch(e){
		console.log(e);
		res.status(500).json({success: false, message:e})
	}
}

module.exports = {InsertBlog, GetUsersAllBlog, EditBlog, DeleteBlog, AllBlogs};


