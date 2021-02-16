import {getAllUsersApi, updateProfileImg} from '../api/'
import {LoginUser} from './AuthAction';
export const getAllUsers = () => async(dispatch) =>{
	try {
		const {data:{users}} = await getAllUsersApi();
		dispatch({type:'GET_ALL_USERS', payload:users});
	} catch(e) {
		// statements
		console.log(e);
	}
}

export const UpdateImg = (imgdata, token) => async (dispatch) =>{
	console.log(imgdata);
	try{
		const {data} = await updateProfileImg(imgdata, token);
		dispatch({type:'IMG_UPDATE', payload:data});
		dispatch({type: 'LOGIN_USER', payload: data})
		localStorage.setItem('Userinfo', JSON.stringify(data))
	}
	catch(e){
		console.log(e);
	}
}