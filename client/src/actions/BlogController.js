import {createBlogApi, getAdminBlogApi, GetAllBlogApi, LikeBlogAPI} from '../api/'

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
		dispatch({type: 'GET_ADMIN_BLOG', payload:blogs.data})
		console.log(blogs.data);
	}
	catch(e){
		dispatch({type:'GET_ADMIN_BLOG_ERROR', payload:e.message})
	}
}

export const getAllBlogs = () => async(dispatch) =>{
	try{
		const blogs = await GetAllBlogApi();
		dispatch({type:'ALL_BLOGS', payload: blogs.data})
	}
	catch(e){
		console.log(e)
	}
}

export const LikeControl = (blogid, token) =>async(dispatch) =>{
	try {
		const count = await LikeBlogAPI(blogid, token);
		console.log(count);
		dispatch({type:'UPDATE_LIKE', payload: count.data});
	} catch (error) {
		console.log(error);
	}
}