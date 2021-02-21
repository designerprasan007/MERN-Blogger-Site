import {createBlogApi} from '../api/'

export const CreateBlogFun = (blogdata, token) => async(dispatch) =>{
	try {
		const {blogs} = await createBlogApi(blogdata, token);
		dispatch({type:'STORE_NEW_BLOG', payload:blogs});
		console.log({blogs});
	} catch(e) {
		// statements
		console.log(e);
	}
}
