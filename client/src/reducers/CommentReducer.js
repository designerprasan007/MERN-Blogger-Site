export const CommentReducer = (state=[], action) =>{

	switch (action.type) {
		case 'ALL_COMMENTS':
			return action.payload;	
		case 'NEW_COMMENT':
			return [...state, action.payload];
		case 'DELETE_COMMENT':
			return({success: true, comment:action.payload});		
		default:
			return state
			break;
	}
}