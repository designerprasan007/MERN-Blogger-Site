import {getCommentsApi} from '../api'
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
