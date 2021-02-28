export const BlogReducer = (state={}, action) =>{

	switch(action.type){
		case 'STORE_NEW_BLOG':
			return {success: true}
		case 'STORE_NEW_ERROR':
			return {error: action.payload}
		case 'GET_ADMIN_BLOG':
			return({success: true, blogs: action.payload})
		case 'GET_ADMIN_BLOG_ERROR':
			return({error:action.payload});
		case 'ALL_BLOGS':
			return({blogs: action.payload});
		default:
			return state
	}


}