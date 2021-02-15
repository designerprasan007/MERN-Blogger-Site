export const AuthReducer =  (state={}, action) =>{
	// console.log(action.payload);	
	switch (action.type) {
		case 'LOGIN_USER':
			return {userdata: action.payload, success: true};
		case 'LOGIN_ERROR':
			return {error:action.payload};
		case 'LOGIN_RESET':
			return {}; 
		// case 'LOGOUT_USER':
		// 	return {token: action.payload, success: true};	
		// case 'LOGOUT_ERROR':
		// 	return{error:action.payload};	
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

