export const CommentReducer = (state={}, action) =>{

	switch (action.type) {
		case 'ALL_COMMENTS':
			return({success:true, comments:action.payload})		
		default:
			return state
			break;
	}
}