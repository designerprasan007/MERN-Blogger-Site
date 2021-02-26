const Blog = require('../models/BlogModel');
const User = require('../models/UserModel');


const BlogComments = async (req, res)=>{
    const _id = req.body.blogid;

    const comment = await Blog.findOne({_id});
    const comments = comment.comments; 
    res.status(200).json({success: true, comments}) 
}

const CreateComment = async (req, res) =>{
    const {adminid, blogid, comment} = req.body;
    console.log(adminid, blogid, comment);
    try{
        if(!adminid || !blogid || !comment) return res.status(400).json({success: false, error:"All Fields Required"});

        const user = await User.findOne({_id:adminid});
        if(!user) return res.status(403).json({success: false, error:'Not Authorized'});

        const blog = await Blog.findById({_id:blogid});
        if(!blog) return res.status(404).json({success:false, error:"Post Not found"});
        const update = await Blog.findByIdAndUpdate(blogid,{
            $push:{
                comments:{
                  commenterId:  adminid,
                  comment: comment
                }
            }
        },{
            new:true
        })
        res.status(200).json({success:true, update});
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
}

const EditComment = async(req, res) =>{
    const user = req.user;
    const _id = req.body.id;
    const blogid = req.body.blogid;
    const edit_comment = req.body.comment;
    try{
        const blog = await Blog.findById({_id:blogid});
        const comment = blog.comments;
        comment.map(async(com)=>{
            if(com._id == _id){
                com.comment = edit_comment ? edit_comment : com.comment;
                await blog.save();
            }
        })
        res.status(200).json({success:true, comment});
    }
    catch(err){
        console.log(err);
        res.status(500).json({success:false, message: err})
    }
}

const DeleteComment = async(req, res) =>{
    try {
        const user = req.user;
        const _id = req.body.id;
        const blogid = req.body.blogid;
        const userid = user._id.toString();

        const update = await Blog.findByIdAndUpdate(blogid,{
            $pull:{
                comments:{
                  _id
                }
            }
        },{
            new:true
        })
        res.status(200).json({success: true, update});
    } catch(e) {
        console.log(e);
        res.status(500).json({success:false, message: e.message})
    }
}

module.exports = {BlogComments, CreateComment, EditComment, DeleteComment}