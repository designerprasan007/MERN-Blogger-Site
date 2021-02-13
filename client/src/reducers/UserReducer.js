export const GetUserReducer = (state={}, action) =>{
	switch (action.type) {
		case 'GET_ALL_USERS':
			return {userdata: action.payload, success: true};
		default:
			return state
	}
} 