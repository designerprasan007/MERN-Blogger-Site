import {Link} from 'react-router-dom';
import './Style.css';

const Register = () =>{
	return (
		<div className="container-fluid">
			<div className="row pt-5 heroClass">
				<div className="col-md-4 offset-md-4">
					<form className="p-5 formClass">
						<h1 className="text-center py-3 text-success border-bottom border-success">Signup Form</h1>
						   <div className="form-group pt-3">
						    <label htmlFor="username">Username</label>
						    <input type="text" className="form-control" id="username" aria-describedby="emailHelp" />
						  </div>
						  <div className="form-group pt-3">
						    <label htmlFor="email">Email address</label>
						    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
						  </div>
						  <div className="form-group">
						    <label htmlFor="password">Password</label>
						    <input type="password" className="form-control" id="password" />
						  </div>
						  <div className="form-group">
						    <label htmlFor="confpassword">Confirm Password</label>
						    <input type="password" className="form-control" id="confpassword" />
						  </div>
						  <div className="text-center pb-2">
						  	<button type="submit" className="btn btn-success btn-sm">Submit</button>
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