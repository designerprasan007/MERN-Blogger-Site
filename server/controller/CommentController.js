const Blog = require('../models/BlogModel');
const User = require('../models/UserModel');


const BlogComments = async (req, res)=>{
    const _id = req.body.blogid;
    const comment = await Blog.findById({_id}).populate('comments.commenterId','username userPic');
    const comments = comment.comments; 
    res.status(200).json({comments}) 
}

const CreateComment = async (req, res) =>{
    const {blogid, comment} = req.body;
    const data = req.user;
    const adminid = data.userId;

    // console.log(adminid, blogid, comment);
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
        }).populate('comments.commenterId','username userPic');
        res.status(200).json({update});
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
        res.status(200).json({comment});
    }
    catch(err){
        console.log(err);
        res.status(500).json({success:false, message: err})
    }
}

const DeleteComment = async(req, res) =>{
    try {
        const _id = req.body.id;
        const blogid = req.body.blogid;

        const update = await Blog.findByIdAndUpdate(blogid,{
            $pull:{
                comments:{
                  _id
                }
            }
        },{
            new:true
        }).populate('comments.commenterId','username userPic');
        res.status(200).json({update});
    } catch(e) {
        console.log(e);
        res.status(500).json({success:false, message: e.message})
    }
}

module.exports = {BlogComments, CreateComment, EditComment, DeleteComment}