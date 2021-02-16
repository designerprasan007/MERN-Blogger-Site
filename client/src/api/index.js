import axios from 'axios';


const authUrl = 'http://localhost:4500/api/auth';
const viewUrl = 'http://localhost:4500/api/views';

export const LoginUserapi = (userdata) => axios.post(`${authUrl}/login`, userdata);

export const RegisterDataApi = (userdata) =>axios.post(`${authUrl}/register`, userdata);

export const getAllUsersApi = () =>axios.get(`${viewUrl}/users`);

export const updateProfileImg = (formdata, token) => axios.put(`${authUrl}/userimgEdit`, formdata, {
	headers:
		{
			"Content-Type":"multipart/form-data",
			Authorization: 'Bearer ' + token 
		}
})