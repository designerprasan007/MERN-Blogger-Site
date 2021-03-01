import {Link} from 'react-router-dom';
import {Dropdown} from 'react-bootstrap';
import {useSelector} from 'react-redux';
import {useState, useEffect} from 'react'; 

import {LogoutUser} from '../../actions/AuthAction';

import './Style.css'

const Nav = ({userdata, isLoggedin}) =>{

	const LogginOut = async () =>{
		let token = userdata.token;
		var logedout = await LogoutUser(token);
		if (logedout) {
			window.location = window.location.origin;
		}
	}

	return(
		<div className="container-fluid shadow p-3 mb-3 bg-white rounded">
			<div className="row">
				<div className="col-md-3 col-3 text-center">
				<Link to= '/blogs' key="1">
					<img src="https://blog.clickoncare.com/wp-content/uploads/2018/05/cropped-coc-NEW-IMAGE-LOGO.png" className="profilePic" />
				</Link>
				</div>
				<div className="col-md-6 col-6">
					<input type="text" placeholder="&#x2315;" className="form-control" />
				</div>
				<div className="col-md-3 col-3 text-center">
				{ isLoggedin ?
					(
					<>
						<Dropdown>
						  <Dropdown.Toggle variant="light" id="dropdown-basic">
						  	<img className="profilePic" src={`http://localhost:4500/${userdata.user.profilePic}`} />
						  </Dropdown.Toggle>
						  <Dropdown.Menu>
						    <Dropdown.Item onClick={LogginOut}>Logout</Dropdown.Item>
						  </Dropdown.Menu>
						</Dropdown>
					</>
					):(
						<>
							<Link className="btn btn-primary btn-sm mr-2" to="/"> Login</Link>
							<Link className="btn btn-success btn-sm mr-2" to="/register"> Signup</Link>
						</>
					) 
				}
				</div>
			</div>
		</div>
		)
}

export default Nav