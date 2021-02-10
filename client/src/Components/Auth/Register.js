import {useState} from 'react';
import {RegisterUser} from '../../actions/AuthAction';
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom';
import './Style.css';

const Register = () =>{
	const [registerdata, setRegisterData] = useState({username:'', email:'', password:'', confPassword:''});
	const [allfielderror, setAllfielderror] = useState(false);
	const [passnotmatch, setPassnotmatch] = useState(false);


	const dispatch = useDispatch();
	const {error, userdata} = useSelector((state) =>state.RegisterReducer)

	console.log(userdata)
	if (error) {
		setTimeout(() =>dispatch({type:'REGISTER_ERROR'}), 5000)
	}
	if(userdata){
		registerdata.username = '';
		registerdata.email = '';
		registerdata.password = '';
		registerdata.confPassword = '';
	}
	const handlesubmit = (e) =>{
		e.preventDefault();
		if(!registerdata.username || !registerdata.email || !registerdata.password || !registerdata.confPassword){
			setAllfielderror(true)
			return
		}
		if (registerdata.password !== registerdata.confPassword) {
				setPassnotmatch(true)
				return
			}
			else{
				setPassnotmatch(false)
				setAllfielderror(false)
				dispatch(RegisterUser(registerdata));
			}
	}

	return (
		<div className="container-fluid">
			<div className="row pt-5 heroClass">
				<div className="col-md-4 offset-md-4">
					<form className="p-5 formClass">
						<h1 className="text-center py-3 text-success border-bottom border-success">Signup Form</h1>
							{error && <p className="text-danger">email already taken</p> }
							{allfielderror && <p className="text-danger">All Fields Required</p>}
							{passnotmatch && <p className="text-danger">Password not match</p>}

						   <div className="form-group pt-3">
						    <label htmlFor="username">Username</label>
						    <input type="text" value={registerdata.username} onChange={(e)=>setRegisterData({...registerdata, username:e.target.value})} className="form-control" id="username" aria-describedby="emailHelp" />
						  </div>
						  <div className="form-group pt-3">
						    <label htmlFor="email">Email address</label>
						    <input type="email" value={registerdata.email} onChange={(e) =>setRegisterData({...registerdata, email:e.target.value})} className="form-control" id="email" aria-describedby="emailHelp" />
						  </div>
						  <div className="form-group">
						    <label htmlFor="password">Password</label>
						    <input type="password" value={registerdata.password} onChange={(e) => setRegisterData({...registerdata, password:e.target.value})} className="form-control" id="password" />
						  </div>
						  <div className="form-group">
						    <label htmlFor="confpassword">Confirm Password</label>
						    <input type="password" value={registerdata.confPassword} onChange={(e)=>setRegisterData({...registerdata, confPassword:e.target.value})} className="form-control" id="confpassword" />
						  </div>
						  <div className="text-center pb-2">
						  	<button type="submit" onClick={handlesubmit} className="btn btn-success btn-sm">Submit</button>
							<div className="pt-3">
								<span className="">Already Have Account? </span>
							  	<Link className="btn-sm" to='/'>Login </Link>
							</div>  	
					  	  </div>
					</form>
				</div>
			</div>
		</div>
		)
}


export default Register