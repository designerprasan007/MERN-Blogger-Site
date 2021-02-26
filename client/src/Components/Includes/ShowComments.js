import {useState, useEffect} from 'react';
import {getBlogComments} from '../../actions/CommentController';
import {useDispatch, useSelector} from 'react-redux';
const ShowComments = ({userdata, blogId, blogdata}) =>{

	const blogDetail = blogdata.data.blogs[0];
	const dispatch = useDispatch();


	const {comments} = useSelector(state=>state.CommentReducer);
	const comment = comments?.data?.comments 
	console.log(comment)

	useEffect(() => {
		dispatch(getBlogComments(blogId));
	}, [])

	return(
		<div className="row no-gutters pt-3">
			<div className="col-md-2 col-3 pl-3 pb-3 border-bottom">
				<img src={`http://localhost:4500/${userdata.user.profilePic}`} className="blogAdminImg rounded-circle" />
			</div>
			<div className="col-md-10 col-9 border-bottom">
				<p><strong>{blogDetail.title}</strong><span className="pl-2">{blogDetail.content}</span></p>
				<p>{
    				blogDetail.tags.split(',').map((t, i)=>{
    					return(<a href="#" key={i}>#{t } </a>)
    				})

    			}</p>
			</div>
			{comment?.map((com)=>{
				return(
					<div className="col-md-12 col-12"  key={com._id}>
						<div className="row no-gutters pt-3">
							<div className="col-md-2 col-3 pl-3 pb-3 borde-bottom">
								<img src={`http://localhost:4500/${com.commenterId.userPic}`} className="blogAdminImg rounded-circle" />
							</div>
							<div className="col-md-10 col-9 border-bottom">
								<p><strong>{com.commenterId.username}</strong><span className="pl-2">{com.comment}</span></p>
							</div>
						</div>
					</div>
				)		
			})}
		</div>

		)
}


export default ShowComments;