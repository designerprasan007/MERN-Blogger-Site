export const CommentReducer = (state=[], action) =>{

	switch (action.type) {
		case 'ALL_COMMENTS':
			return {state:action.payload};	
		case 'NEW_COMMENT':
			return {state:action.payload};	
		case 'DELETE_COMMENT':
			return {state:action.payload};	
		default:
			return state
	}
}