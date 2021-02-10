export const AuthReducer =  (state={}, action) =>{
	switch (action.type) {
		case 'LOGIN_USER':
			return {userdata: action.payload};
		case 'LOGIN_ERROR':
			return {error:action.payload};
		case 'LOGIN_RESET':
			return {}; 
		default:
			return state
	}
}

export const RegisterReducer = (state={}, action) =>{
	switch (action.type) {
		case 'REGISTER_USER':
			return {userdata: action.payload};
		case 'REGISTER_ERROR':
			return {error: action.payload};	
		default:
			return state;		
			break;
	}
}

