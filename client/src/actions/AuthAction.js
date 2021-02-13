import {LoginUserapi, RegisterDataApi, LogoutUserApi} from '../api';

export const LoginUser = (userdata) => async(dispatch) =>{
	try {
		const {data} = await LoginUserapi(userdata);
		dispatch({type:'LOGIN_USER', payload:data});
		localStorage.setItem('Userinfo', JSON.stringify(data))
	} catch(e) {
		dispatch({type:'LOGIN_ERROR', payload:e.message});
	}
}

export const RegisterUser = (userdata) => async(dispatch) =>{
	try{
		const {data} = await RegisterDataApi(userdata);
		dispatch({type:'REGISTER_USER', payload:data});
		localStorage.setItem('Userinfo', JSON.stringify(data));
	}
	catch(e){
		dispatch({type:'REGISTER_ERROR', payload:e.message});
	}
}

export const LogoutUser =  async(token) => {
	try{
		if(token){
			localStorage.removeItem("Userinfo");
			return true
		}
	}
	catch(e){
		console.log(e)
		return false

	}
}