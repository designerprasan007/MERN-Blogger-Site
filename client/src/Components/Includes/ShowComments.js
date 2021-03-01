import {useState, useEffect} from 'react';
import {getBlogComments,storeBlogComment, deleteBlogComment} from '../../actions/CommentController';
import {GetAdminBlog} from '../../actions/BlogController';
import {useDispatch, useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShare, faTrash} from '@fortawesome/free-solid-svg-icons'

import './Style.css';

const ShowComments = ({userdata, blogdata}) =>{

	const [commentinput, SetCommentInput] = useState('');
	const [deletecomment, SetDeleteComment] = useState({status:false, comid:''});
	const [commentId, SetCommentId] = useState('');

	// console.log(blogdata)

	const blogDetail = blogdata;
	const dispatch = useDispatch();

	console.log(blogDetail);
	console.log(blogdata.tags);

	const blogId = blogdata._id;


	const comments = useSelector(state=>state.CommentReducer);
	const comment = comments.state

	const token = userdata.token;

	useEffect(() => {
		dispatch(getBlogComments(blogId));
	}, [])


	const submitComment = (e) =>{
		e.preventDefault();
		dispatch(storeBlogComment(blogId, token, commentinput));
		SetCommentInput('');
	}

	const handleDelete = (e) =>{
		const id = e;
		dispatch(deleteBlogComment(id, token, blogId));
	}
	return(
		<>
		<div className="row no-gutters py-3">
			<div className="col-md-2 col-3 pl-3 pb-3 border-bottom">
				<img src={`http://localhost:4500/${userdata.user.profilePic}`} className="blogAdminImg rounded-circle" />
			</div>
			<div className="col-md-10 col-9 border-bottom">
				<p><strong>{blogDetail.title}</strong><span className="pl-2">{blogDetail.content}</span></p>
				<p>{
    				blogdata.tags.split(',').map((t, i)=>{
    					return(<a href="#" key={i}>#{t } </a>)
    				})

    			}</p>
			</div>
			<div className="commentSection">
				{comment?.map((com)=>{
					return(
						<div className="col-md-12 col-12"  key={com._id}>
							<div className="row no-gutters pt-3">
								<div className="col-md-2 col-3 pl-3 pb-3 borde-bottom">
									<img src={`http://localhost:4500/${com.commenterId.userPic}`} className="blogAdminImg rounded-circle" />
								</div>
								<div className="col-md-8 col-7 border-bottom pb-2">
								<p><strong>{com.commenterId.username}</strong><span className="pl-2">{com.comment}</span></p>
									{deletecomment.status && deletecomment.comid ==com._id ?
										(<button className="btn btn-sm btn-danger" onClick={(e) => handleDelete(com._id)} >Delete</button>):
									 ('')}
								</div>
								{com.commenterId._id == userdata.user._id ? (
									<div className="col-md-2 col-2">
										<p className="text-right">
					    					<FontAwesomeIcon icon={faTrash} onClick={(e) => SetDeleteComment({...deletecomment, status:true, comid:com._id }) } className="fa-1x" />
				    					</p>
									</div>
									):('')}
							</div>
						</div>
					)		
				})}
			</div>	
		</div>
		<div className="row no-gutters py-2">
			<div className="col-md-2 col-2 pt-2 pl-2">
					<img src={`http://localhost:4500/${userdata.user.profilePic}`} className="blogAdminImg rounded-circle" />
			</div>
			<div className="col-md-9 col-9 pt-2">
				<input className="form-control commentinput" placeholder="Write a comment" value={commentinput} onChange={(e)=> SetCommentInput(e.target.value)} />
			</div>
			<div className="col-md-1 col-1 pt-2">
				<FontAwesomeIcon icon={faShare} onClick={submitComment} className="fa-1x mt-2 ml-2 LikeIcon text-dark" />
			</div>
		</div>
		</>

		)
}


export default ShowComments;