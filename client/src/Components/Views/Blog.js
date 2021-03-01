import Nav from '../Includes/Nav';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAllBlogs} from '../../actions/BlogController';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart, faEllipsisV, faComment, faShare} from '@fortawesome/free-solid-svg-icons'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import ShowComments from '../Includes/ShowComments';
import {Modal, Button} from 'react-bootstrap';

import './AllBlog.css'
const Blog = () =>{
	const dispatch = useDispatch();	

	const [isLoggedin, setisLoggedin] = useState(false);
	const [userData, setUserData] = useState({})
	const [showModal, SetShowModal] = useState({status:false, blogdata:''});


	const {userdata} = useSelector((state)=>state.AuthReducer);

	useEffect(() => {
		setUserData(localStorage.getItem('Userinfo'))
		if (localStorage.getItem('Userinfo') !== null) {
			setisLoggedin(true);
		}
	}, [isLoggedin])

	useEffect(()=>{
		dispatch(getAllBlogs())
	}, [])

	const blogs = useSelector(state=>state.BlogReducer)

	console.log(blogs.blogs)

	return(
		<>
			<Nav isLoggedin={isLoggedin} userdata={userdata} />
				<div className="container">
					<div className="filteMobile">
						Filters
					</div>
					<div className="row">
						<div className="col-lg-11 col-12">
							<div className="list-group heroBlog">
							{blogs?.blogs?.map(blog =>{
								return(
									 <div key={blog._id}  className="list-group-item list-group-item-action">
									  	<div className="pb-2">
											<img src={`http://localhost:4500/${blog.adminid.userPic}`} className="blogAdminImg rounded-circle" />
											<span className="pl-3"><strong>{blog.adminid.username}</strong></span>
											<span className="editDots pr-3">
							    				<FontAwesomeIcon icon={faEllipsisV} className="fa-1x" />
											</span>
										</div>
										<CarouselProvider naturalSlideWidth={20} naturalSlideHeight={20} totalSlides={blog.blogpic.length}>
									        <Slider>
									        	{
									        		blog.blogpic.map((img, i)=>(
									        			<Slide index={i} key={i}><img className="blogimg" src={`http://localhost:4500/${img}`} /></Slide>
									        		))
									        	}
									        </Slider>
									        <ButtonBack className="leftCaroselBtn">Back</ButtonBack>
				        					<ButtonNext className="rightCaroselBtn">Next</ButtonNext>
									    </CarouselProvider>	
									    <p className="text-left pl-3 pt-3">
							    			<FontAwesomeIcon icon={faHeart} className="fa-1x mr-3 LikeIcon text-dark" />
							    			<FontAwesomeIcon icon={faComment}  onClick={()=>SetShowModal({...showModal, status:true, blogdata:blog})}  className="fa-1x ml-3 mr-3 LikeIcon text-dark" />
							    			<FontAwesomeIcon icon={faShare} className="fa-1x ml-3 mr-3 LikeIcon text-dark" />
						    			</p>	
									    <div className="d-flex pt-4 w-100 justify-content-between">
									      <h5 className="mb-1">{blog.title}</h5>
									      <small>{blog.created}</small>
									    </div>
									    <p className="mb-1">{blog.content}</p>
									    <p>
									    {
						    				blog.tags.split(',').map((t, i)=>{
						    					return(<a href="#" key={i}>#{t } </a>)
						    				})

						    			}</p>
									    <FontAwesomeIcon icon={faHeart} /><small className="pl-2 text-muted">Likes 10</small>
									  </div>
								)
							})}
						</div>
					</div>
					<div className="col-md-1">
						<p><a  href="/">#Food</a></p>
						<p><a  href="/">#Travel</a></p>
						<p><a  href="/">#Tech</a></p>
						<p><a  href="/">#Info</a></p>
						<p><a  href="/">#Education</a></p>
					</div>
				</div>
			</div>
			<Modal show={showModal.status} onHide={() => SetShowModal({...showModal, status:false})}>
		        <ShowComments userdata={userdata}  blogdata={showModal.blogdata} />
	        </Modal>
		</>

		)
}


export default Blog