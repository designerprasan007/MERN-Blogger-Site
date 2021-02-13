import {useState, useEffect} from 'react';
import Nav from '../Includes/Nav';
import {useSelector, useDispatch} from 'react-redux';
import {getAllUsers} from '../../actions/UsersAction'

import './styles/AllUser.css';
	const AllUsers = () =>{
		const [isLoggedin, setisLoggedin] = useState(false);
		const [userData, setUserData] = useState({})
		const dispatch = useDispatch();
		const {userdata} = useSelector((state) =>state.GetUserReducer);

		useEffect(() => {
			setUserData(localStorage.getItem('Userinfo'))
				if (localStorage.getItem('Userinfo') !== null) {
				setisLoggedin(true);
				dispatch(getAllUsers());		
			}else {
				dispatch(getAllUsers());		
			}
		}, [isLoggedin]);
	return(
			<>
			<Nav isLoggedin={isLoggedin} userData={userData}/>
			<div className="container-fluid pt-5">
				<div className="row">
					<div className="col-md-2 col-12">
					</div>
					<div className="col-md-10 col-12">
						<div className="row">
							{
								userdata !== undefined ? userdata.map((user) =>(
									<div className="col-md-3 col-12" key={user._id}>
										<div className="row no-gutters">
											<div className="col-md-3">
												<img src="https://blog.clickoncare.com/wp-content/uploads/2018/05/cropped-coc-NEW-IMAGE-LOGO.png" className="AllUserpic" />
											</div>
											<div className="col-md-9 useDetail">
												<a href="/">{user.username}</a><br/>
												<p>City</p>
												<p>20</p>
												<p className="usertags">education, entertainment</p>
											</div>
										</div>
									</div>
								)):null
							}
						</div>
					</div>
				</div>
			</div>
			</>
		)
}
export default AllUsers;