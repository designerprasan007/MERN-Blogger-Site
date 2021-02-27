export const CommentReducer = (state={}, action) =>{

	switch (action.type) {
		case 'ALL_COMMENTS':
			return({success:true, comments:action.payload});	
		case 'NEW_COMMENT':
			return({success: true, comment:action.payload});		
		default:
			return state
			break;
	}
}