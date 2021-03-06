import {useState, useEffect} from 'react';
import {getBlogComments,storeBlogComment, deleteBlogComment} from '../../actions/CommentController';
import {GetAdminBlog} from '../../actions/BlogController';
import {useDispatch, useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShare, faTrash} from '@fortawesome/free-solid-svg-icons'
import Moment from 'react-moment';

import './Style.css';

const ShowComments = ({userdata, blogdata}) =>{
	const [isLoggedin, setisLoggedin] = useState(false);

	const [commentinput, SetCommentInput] = useState('');
	const [deletecomment, SetDeleteComment] = useState({status:false, comid:''});
	const [commentId, SetCommentId] = useState('');

	// console.log(blogdata)

	const dispatch = useDispatch();

	const blogId = blogdata._id;


	const comments = useSelector(state=>state.CommentReducer);
	const comment = comments.state

	const token = userdata?.token;
	const userid = userdata?.user?._id;

	useEffect(() => {
		dispatch(getBlogComments(blogId));
	}, [])

	useEffect(() => {
		if (localStorage.getItem('Userinfo') !== null) {
			setisLoggedin(true);
		}
	}, [isLoggedin])


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
				<img src={`http://localhost:4500/${blogdata.adminid.userPic}`} className="blogAdminImg rounded-circle" />
			</div>
			<div className="col-md-10 col-9 border-bottom">
				<p><strong>{blogdata.adminid.username}</strong><span className="pl-2">{blogdata.content}</span></p>
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
								<p><Moment fromNow>{com.date.slice(0, -2)}</Moment></p>
									{deletecomment.status && deletecomment.comid ==com._id ?
										(<button className="btn btn-sm btn-danger" onClick={(e) => handleDelete(com._id)} >Delete</button>):
									 ('')}
								</div>
								{com.commenterId._id == userid ? (
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
			{isLoggedin ? (
				<>
					<div className="col-md-2 col-2 pt-2 pl-2">
						<img src={`http://localhost:4500/${userdata.user.profilePic}`} className="blogAdminImg rounded-circle" />
					</div>
					<div className="col-md-9 col-9 pt-2">
						<input className="form-control commentinput" placeholder="Write a comment" value={commentinput} onChange={(e)=> SetCommentInput(e.target.value)} />
					</div>
					<div className="col-md-1 col-1 pt-2">
						<FontAwesomeIcon icon={faShare} onClick={submitComment} className="fa-1x mt-2 ml-2 LikeIcon text-dark" />
					</div>
				</>
			):(<p className="text-danger pt-2 pl-2"> login to give a comment</p>)}
		</div>
	</>

		)
}


export default ShowComments;