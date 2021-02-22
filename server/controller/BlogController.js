const Blog = require('../models/BlogModel');
const User = require('../models/UserModel');

const InsertBlog = async(req, res) =>{
	const data = req.user;
	const adminid = data.userId;
	const blogpic = req.files.map((img) =>{
		return img.filename;
	})
	const blogdata = req.body;
	// console.log(blogdata)
	// blogdata.tags.map(tag=>{
		console.log(blogdata.tags);
	// })
	const {title, content, tags} = blogdata;
	try {
		// const blog = await Blog.create({title, content, blogpic, adminid, tags});
		res.status(200).json({success: true})
	} catch(e) {
		console.log(e);
		res.status(500).json({success:false, message:e});
	}
}


const GetUsersAllBlog = async(req, res) =>{
	const data = req.user;
	const {adminid} = data.userId;
	try{
		const blogs = await Blog.find(adminid);
		console.log(blogs)
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

module.exports = {InsertBlog, GetUsersAllBlog, EditBlog, DeleteBlog};


