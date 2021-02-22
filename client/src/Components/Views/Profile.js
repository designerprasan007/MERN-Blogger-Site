import {useState, useEffect} from 'react';
import Nav from '../Includes/Nav';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faYoutube, faStackOverflow, faMedium } from "@fortawesome/free-brands-svg-icons"
import {faBars} from '@fortawesome/free-solid-svg-icons'
import {Dropdown} from 'react-bootstrap';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
// import Tabs

import SelfBlogs from '../ProfileTabs/SelfBlogs';
import SelfEdit from '../ProfileTabs/SelfEdit';
import CreateBlog from '../ProfileTabs/CreateBlog';
import MobileProfileTab from '../ProfileTabs/MobileProfileTab';
import './Profile.css';

const Profile = ({history})=> {
	const [isLoggedin, setisLoggedin] = useState(false);
	const [userData, setUserData] = useState({})

	const {userdata} = useSelector((state)=>state.AuthReducer);

	useEffect(() => {
		setUserData(localStorage.getItem('Userinfo'))
		if (localStorage.getItem('Userinfo') !== null) {
			setisLoggedin(true);
		}
		else{
			history.push('/')
		}
	}, [isLoggedin])
	
	const [tab, setTab] = useState('Blogs')
	const CallTab = (componentType) =>{
		setTab(componentType);
	}
	return(
		<>
			<Nav  isLoggedin={isLoggedin} userdata={userdata}/>
			{userdata ? (
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-3 mobileProfile">
						<img src={`http://localhost:4500/${userdata.user.profilePic}`} className="mainProfilePic rounded-circle" />
						<div className="pt-4 text-left">
							<span className="profileHeader">Name</span>:<span className="profileName"> {userdata.user.username}</span><br/>
							<span className="profileHeader">Email</span>:<span className="profileName"> {userdata.user.email}</span><br/>
							<span className="profileHeader">City</span>:<span className="profileName"> {userdata.user.address}</span><br/>
							<span className="profileHeader">Blogs</span>:<span className="profileName"> 10</span><br />
							<h2 className="pt-2">
								{userdata.user.userLinks ? (userdata.user.userLinks.map((link) =>{
									 if(link.includes('youtube.com')){
									    return(<Link to= {link} key="1"><FontAwesomeIcon className="text-danger mx-2" icon={faYoutube} /></Link>)
									  }
									  if(link.includes('facebook.com')){
									    return(<Link to= '/' key="2"> <FontAwesomeIcon className="text-primary mx-2" icon={faFacebook} /></Link>)
									  }
									  if(link.includes('stackoverflow.com')){
									    return(<Link to='/' key="3"><FontAwesomeIcon  className="text-warning mx-2" icon={faStackOverflow} /></Link>)
									  }
									  if(link.includes('twitter.com')){
									    return(<Link to='/' key="4"><FontAwesomeIcon  className="text-primary mx-2" icon={faTwitter} /></Link>)
									  }
									  if(link.includes('medium.com')){
									    return(<Link to='/' key="5"><FontAwesomeIcon  className="text-dark mx-2" icon={faMedium} /></Link>)
									  }
								})) : ''}
							</h2>
						</div>
					</div>
					<div className="col-md-9 col-12 profileSection">
						<ul className="list-inline border-bottom p-3 text-center webSiteView">
						  <li className="list-inline-item px-3">
						  	<button className="btn btn-outline-warning" onClick={() =>CallTab('Blogs')}>Blogs</button>
						  </li>
						  <li className="list-inline-item px-3">
						  	<button className="btn btn-outline-warning" onClick={() =>CallTab('Create')}>Create</button>
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
							<Dropdown.Item onClick={() =>CallTab('Profile')}>Profile</Dropdown.Item>
						    <Dropdown.Item onClick={() =>CallTab('Blogs')}>Blogs</Dropdown.Item>
					        <Dropdown.Item onClick={() =>CallTab('Create')}>Create</Dropdown.Item>
					        <Dropdown.Item onClick={() =>CallTab('Edit')}>Edit</Dropdown.Item>
						  </Dropdown.Menu>
						</Dropdown>
						</div>
						<div className="container">
								{
									tab === 'Blogs' &&(
										<SelfBlogs userdata={userdata} />
										)
								}
								{
									tab === 'Edit' &&(
										<SelfEdit userdata = {userdata} />
										)
								}
								{
									tab === 'Create' &&(
										<CreateBlog userdata = {userdata} />
										)
								}
								{
									tab === 'Profile' &&(
										<MobileProfileTab userdata = {userdata} />
										)
								}
						</div>	
					</div>
				</div>
			</div>
			): 'null'}
		</>
		)
}


export default Profile