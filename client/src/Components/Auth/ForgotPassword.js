import {Link} from 'react-router-dom';
import './Style.css';

const ForgotPassword = () =>{
	return (
		<div className="container-fluid">
			<div className="row pt-5 heroClass">
				<div className="col-md-4 offset-md-4">
					<form className="p-5 formClass">
						<h1 className="text-center py-3 text-success border-bottom border-success">ForgotPassword Form</h1>
						  <div className="form-group pt-3">
						    <label htmlFor="email">Email address</label>
						    <input type="text" className="form-control" id="email" aria-describedby="emailHelp" />
						  </div>
						  <div className="text-center pb-2">
						  	<button type="submit" className="btn btn-success btn-sm">Send</button>
					  	  </div>
					</form>
				</div>
			</div>
		</div>
		)
}



export default ForgotPassword