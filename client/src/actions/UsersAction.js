import {getAllUsersApi} from '../api/'
export const getAllUsers = () => async(dispatch) =>{
	try {
		const {data:{users}} = await getAllUsersApi();
		dispatch({type:'GET_ALL_USERS', payload:users});
	} catch(e) {
		// statements
		console.log(e);
	}
}