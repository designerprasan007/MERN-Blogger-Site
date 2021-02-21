export const BlogReducer = (state={}, action) =>{

	switch(action.type){
		case 'STORE_NEW_BLOG':
			return {blogs: action.payload, success: true}
		default:
			return state
	}


}