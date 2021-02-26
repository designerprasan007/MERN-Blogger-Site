import {useState, useEffect} from 'react';
import {getBlogComments} from '../../actions/CommentController';
import {useDispatch} from 'react-redux';
const ShowComments = ({userdata, blogId, blogdata}) =>{

	console.log()
	const blogDetail = blogdata.data.blogs[0];
	console.log(blogDetail.tags);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getBlogComments(blogId));
	}, [])

	return(
		<div className="row no-gutters pt-3">
			<div className="col-md-2 col-3 pl-3 pb-3">
				<img src={`http://localhost:4500/${userdata.user.profilePic}`} className="blogAdminImg rounded-circle" />
			</div>
			<div className="col-md-10 col-9">
				<p><strong>{blogDetail.title}</strong><span className="pl-2">{blogDetail.content}</span></p>
			</div>
		</div>
		)
}


export default ShowComments;