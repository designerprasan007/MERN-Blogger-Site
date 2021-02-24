import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {GetAdminBlog} from '../../actions/BlogController';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import {faHeart, faComment, faShare, faEllipsisV} from '@fortawesome/free-solid-svg-icons'
import ShowComments from '../Includes/ShowComments';
import {Modal, Button} from 'react-bootstrap';

import './Style.css'
const SelfBlogs = ({userdata}) =>{
	const [imageNum, setimageNum] = useState('');
	const [showModal, SetShowModal] = useState({status:false, blogId:''});
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(GetAdminBlog(userdata.token));
	}, [])
	const {blogs} = useSelector(state=>state.BlogReducer);
	console.log(blogs);
	return(
		<>
		<div className="row blogHero no-gutters">
			{
				blogs?.data?.blogs?.map(blog=>(
				<div className="col-md-6 col-12 py-3" key={blog._id}>
				<div className="pb-2">
				<img src={`http://localhost:4500/${userdata.user.profilePic}`} className="blogAdminImg rounded-circle" />
				<span className="pl-3"><strong>{blog.title}</strong></span>
				<span className="editDots">
    				<FontAwesomeIcon icon={faEllipsisV} className="fa-1x" />
				</span>
				</div>
					<div className="card content text-left">
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
			    			<FontAwesomeIcon icon={faComment} onClick={()=>SetShowModal({...showModal, status:true, blogId:blog._id})}  className="fa-1x ml-3 mr-3 LikeIcon text-dark" />
			    			<FontAwesomeIcon icon={faShare} className="fa-1x ml-3 mr-3 LikeIcon text-dark" />
		    			</p>	
		    			<span className="pl-2">{blog.likes.length ==0 ? 
		    				(<small>Give a first Like</small>)
		    				:(blog.likes)}</span>
		    			<p className="text-left blog_content pl-2 pt-2"><small>{blog.content}</small></p>
						<span className="pl-2">{blog.comments.length !== 0 &&  
		    				(blog.likes)}</span>
			    	</div>
				</div>
					))
			}
		</div>	

		 <Modal show={showModal.status} onHide={() => SetShowModal({...showModal, status:false})}>
	        <Modal.Header closeButton>
	          <Modal.Title>Modal heading</Modal.Title>
	        </Modal.Header>
	        <ShowComments userdata={userdata} blogId = {showModal.blogId} />
	        <Modal.Footer>
	          <Button variant="secondary" onClick={() => SetShowModal({...showModal, status:false})}>
	            Close
	          </Button>
	          <Button variant="primary" onClick={() => SetShowModal(false)}>
	            Save Changes
	          </Button>
	        </Modal.Footer>
	      </Modal>
      </>
		)
}

export default SelfBlogs