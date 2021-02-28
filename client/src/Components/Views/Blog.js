import Nav from '../Includes/Nav';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAllBlogs} from '../../actions/BlogController';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons'

import './AllBlog.css'
const Blog = () =>{

	const dispatch = useDispatch();	
	useEffect(()=>{
		dispatch(getAllBlogs())
	}, [])

	const blogs = useSelector(state=>state.BlogReducer)

	console.log(blogs);

	return(
		<>
			<Nav />
				<div className="container">
					<div className="filteMobile">
						Filters
					</div>
					<div className="row">
						<div className="col-lg-11 col-12">
							<div className="list-group heroBlog">
							  <a href="#" className="list-group-item list-group-item-action">
								<img src="https://i.pinimg.com/originals/ca/76/0b/ca760b70976b52578da88e06973af542.jpg" className="content-image  card-img-top blogImage" alt="..." />
							    <div className="d-flex pt-4 w-100 justify-content-between">
							      <h5 className="mb-1">Blog1</h5>
							      <small>3 days ago</small>
							    </div>
							    <p className="mb-1">Blog Description</p>
							    <p>#tags</p>
							    <FontAwesomeIcon icon={faHeart} /><small className="pl-2 text-muted">Likes 10</small>
							  </a>
							  <a href="#" className="list-group-item list-group-item-action">
								<img src="https://i.pinimg.com/originals/ca/76/0b/ca760b70976b52578da88e06973af542.jpg" className="content-image  card-img-top blogImage" alt="..." />
							    <div className="d-flex pt-4 w-100 justify-content-between">
							      <h5 className="mb-1">Blog 2</h5>
							      <small className="text-muted">3 days ago</small>
							    </div>
							    <p className="mb-1">Blog Description</p>
							    <p>#tags</p>
							    <FontAwesomeIcon icon={faHeart} /><small className="pl-2 text-muted">Likes 10</small>
							  </a>
							  <a href="#" className="list-group-item list-group-item-action">
							    <div className="d-flex pt-4 w-100 justify-content-between">
							      <h5 className="mb-1">Blog 3</h5>
							      <small className="text-muted">3 days ago</small>
							    </div>
							    <p className="mb-1">Blog Description</p>
							    <p>#tags</p>
							    <FontAwesomeIcon icon={faHeart} /><small className="pl-2 text-muted">Likes 10</small>
							  </a>
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
		</>

		)
}


export default Blog