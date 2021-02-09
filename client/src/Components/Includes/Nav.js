import {Link} from 'react-router-dom';
import {Dropdown} from 'react-bootstrap';

import './Style.css'

const Nav = () =>{
	const isLoggedin = true;
	return(
		<div className="container-fluid shadow p-3 mb-3 bg-white rounded">
			<div className="row">
				<div className="col-md-3 col-3 text-center">
				<img src="https://blog.clickoncare.com/wp-content/uploads/2018/05/cropped-coc-NEW-IMAGE-LOGO.png" className="profilePic" />
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
						  	<img className="profilePic" src="https://static.thenounproject.com/png/17241-200.png" />
						  </Dropdown.Toggle>
						  <Dropdown.Menu>
						    <Dropdown.Item href="#/action-2">Logout</Dropdown.Item>
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