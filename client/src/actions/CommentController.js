import {getCommentsApi, storeCommentApi, deleteCommentApi} from '../api'
export const getBlogComments = (blogid) =>async(dispatch) =>{
	console.log(blogid);
	try {
		const comments = await getCommentsApi(blogid);
		dispatch({type:'ALL_COMMENTS', payload:comments}); 
		// console.log(comments);
	} catch(e) {
		console.log(e);
	}
}

export const storeBlogComment = (blogid, token, comment) => async(dispatch) =>{
	try {
		const storecomment = await storeCommentApi(blogid, token, comment);
		dispatch({type:'NEW_COMMENT', payload:storecomment});
	} catch(e) {
		console.log(e);
	}
}

export const deleteBlogComment = (id, token, blogid) => async(dispatch) =>{
	try {
		await deleteCommentApi(id, token, blogid);
	} catch(e) {
		console.log(e);
	}
}