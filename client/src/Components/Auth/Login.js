import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {LoginUser} from '../../actions/AuthAction' 
import './Style.css';

const Login = ({history}) =>{
	const [logindata, setLoginData] = useState({email: '', password: ''});
	const dispatch = useDispatch();
	const {error,success, userdata} = useSelector((state) =>state.AuthReducer);
	if (error) {
		setTimeout(() => dispatch({type:'LOGIN_RESET'}), 5000)
	}
	useEffect(() => {
		if(success){
			history.push(`/profiles/${userdata.user.username}`)
		}	
	}, [success])
	
	const LoginHandle = (e) =>{
		e.preventDefault();
		dispatch(LoginUser(logindata))
		logindata.email = '';
		logindata.password = '';
	}
	return (
		<div className="container-fluid">
			<div className="row pt-5 heroClass">
				<div className="col-md-4 offset-md-4">
					<form className="p-5 formClass">
						<h1 className="text-center py-3 text-success border-bottom border-success">Login Form</h1>
						  {error && <p className="text-danger">Invalid Username Or Password</p>}
						  <div className="form-group pt-3">
						    <label htmlFor="exampleInputEmail1">Email address</label>
						    <input type="email" value={logindata.email} onChange={(e) =>setLoginData({...logindata, email:e.target.value})} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
						  </div>
						  <div className="form-group">
						    <label htmlFor="exampleInputPassword1">Password</label>
						    <input type="password" value={logindata.password} onChange={(e) =>setLoginData({...logindata, password:e.target.value})} className="form-control" id="exampleInputPassword1" />
						  </div>
						  <div className="py-3">
								<span className="">Forgot password? </span>
							  	<Link className="btn-sm" to='/forgotpass'>Forgot Password </Link>
						  </div> 
						  <div className="text-center pb-2">
						  	<button type="submit" className="btn btn-success btn-sm" onClick={LoginHandle}>Submit</button>
							<div className="pt-3">
								<span className="">New user? </span>
							  	<Link className="btn-sm" to='/register'>Register </Link>
							</div>   	
					  	  </div>
					</form>
				</div>
			</div>
		</div>
		)
}



export default Login