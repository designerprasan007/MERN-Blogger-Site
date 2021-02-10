import axios from 'axios';


const url = 'http://localhost:4500/api/auth';


export const LoginUserapi = (userdata) => axios.post(`${url}/login`, userdata);

export const RegisterDataApi = (userdata) =>axios.post(`${url}/register`, userdata);