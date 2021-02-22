import {createBlogApi, getAdminBlogApi} from '../api/'

export const CreateBlogFun = (blogdata, token) => async(dispatch) =>{
	try {
		const blogs = await createBlogApi(blogdata, token);
		dispatch({type:'STORE_NEW_BLOG', payload:blogs});
	} catch(e) {
		dispatch({type:'STORE_NEW_ERROR', payload:e.message});
	}
}

export const GetAdminBlog = (token) => async(dispatch) =>{
	try{
		const blogs = await getAdminBlogApi(token);
		dispatch({type: 'GET_ADMIN_BLOG', payload:blogs})
	}
	catch(e){
		dispatch({type:'GET_ADMIN_BLOG_ERROR', payload:e.message})
	}
}