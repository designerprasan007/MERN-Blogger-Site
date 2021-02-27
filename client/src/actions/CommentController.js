import {getCommentsApi, storeCommentApi, deleteCommentApi} from '../api'
export const getBlogComments = (blogid) =>async(dispatch) =>{
	try {
		const comments = await getCommentsApi(blogid);
		dispatch({type:'ALL_COMMENTS', payload:comments.data.comments}); 
		console.log(comments.data.comments);
	} catch(e) {
		console.log(e);
	}
}

export const storeBlogComment = (blogid, token, comment) => async(dispatch) =>{
	try {
		const storecomment = await storeCommentApi(blogid, token, comment);
		dispatch({type:'NEW_COMMENT', payload:storecomment.data.update.comments});
		console.log(storecomment.data.update.comments);
	} catch(e) {
		console.log(e);
	}
}

export const deleteBlogComment = (id, token, blogid) => async(dispatch) =>{
	try {
		const deleted = await deleteCommentApi(id, token, blogid);
		dispatch({type:'DELETE_COMMENT', payload:deleted.data.update.comments});
		console.log(deleted.data.update.comments);
	} catch(e) {
		console.log(e);
	}
}