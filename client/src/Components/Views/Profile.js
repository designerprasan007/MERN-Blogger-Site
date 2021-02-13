import {useState, useEffect} from 'react';
import Nav from '../Includes/Nav';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faYoutube, faStackOverflow, faMedium } from "@fortawesome/free-brands-svg-icons"
import {faBars} from '@fortawesome/free-solid-svg-icons'
import {Dropdown} from 'react-bootstrap';

// import Tabs

import SelfBlogs from '../ProfileTabs/SelfBlogs';
import SelfEdit from '../ProfileTabs/SelfEdit';


import './Profile.css';

const Profile = ()=> {
	const [isLoggedin, setisLoggedin] = useState(false);
	const [userData, setUserData] = useState({})

	useEffect(() => {
		setUserData(localStorage.getItem('Userinfo'))
		if (localStorage.getItem('Userinfo') !== null) {
			setisLoggedin(true);
		}
	}, [isLoggedin])


	const [tab, setTab] = useState('Blogs')
	const CallTab = (componentType) =>{
		setTab(componentType);
	}
	return(
		<>
			<Nav  isLoggedin={isLoggedin} userData={userData}/>
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-3 col-6">
						<img src="https://static.thenounproject.com/png/17241-200.png" className="mainProfilePic" />
						<div className="pt-4 text-left">
							<span className="profileHeader">Name</span>:<span className="profileName"> Prasanna</span><br/>
							<span className="profileHeader">Blogs</span>:<span className="profileName"> 10</span><br />
							<h2 className="pt-2">
								<FontAwesomeIcon className="text-primary mx-2" icon={faFacebook} />
								<FontAwesomeIcon className="text-primary mx-2" icon={faTwitter} /> 
								<FontAwesomeIcon className="text-danger mx-2" icon={faYoutube} /> 
								<FontAwesomeIcon className="text-warning mx-2" icon={faStackOverflow} /> 
								<FontAwesomeIcon className="text-dark mx-2" icon={faMedium} /> 
							</h2>
						</div>
					</div>
					<div className="col-md-9 col-6 profileSection">
						<ul className="list-inline border-bottom p-3 text-center webSiteView">
						  <li className="list-inline-item px-3">
						  	<button className="btn btn-outline-warning" onClick={() =>CallTab('Blogs')}>Blogs</button>
						  </li>
						  <li className="list-inline-item px-3">
						  	<button className="btn btn-outline-warning" onClick={() =>CallTab('Edit')}>Edit</button>
						  </li>
						</ul>
						<div className="humburger">
						<Dropdown>
						  <Dropdown.Toggle variant="light" id="dropdown-basic">
						  	<FontAwesomeIcon icon ={faBars} />
						  </Dropdown.Toggle>
						  <Dropdown.Menu>
						    <Dropdown.Item onClick={() =>CallTab('Blogs')}>Blogs</Dropdown.Item>
					        <Dropdown.Item onClick={() =>CallTab('Edit')}>Edit</Dropdown.Item>
						  </Dropdown.Menu>
						</Dropdown>
						</div>
						<div className="container">
								{
									tab === 'Blogs' &&(
										<SelfBlogs />
										)
								}
								{
									tab === 'Edit' &&(
										<SelfEdit />
										)
								}
						</div>	
					</div>
				</div>
			</div>
		</>
		)
}


export default Profile