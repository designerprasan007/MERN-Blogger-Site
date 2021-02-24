const Blog = require('../models/BlogModel');
const User = require('../models/UserModel');


const BlogComments = async (req, res)=>{
    const commentId = req.body.commentId;

    const comment = await Blog.findOne({_id:commentId});
    const comments = comment.comments; 
    res.status(200).json({success: true, comments}) 
}

const CreateBlog = async (req, res) =>{
    const {adminid, blogid, comment} = req.body;
    console.log(adminid, blogid, comment);
    try{
        const user = await User.findOne({_id:adminid});

    if(!user) return res.status(403).json({success: false, error:'Not Authorized'});

    const blog = await Blog.findById({_id:blogid});

    console.log(blog);
    res.send(adminid);

    }
    catch(err){
        console.log(err);
        res.send(err);
    }
}


module.exports = {BlogComments, CreateBlog}