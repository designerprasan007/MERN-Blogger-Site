import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {GetAdminBlog} from '../../actions/BlogController';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import {faHeart} from '@fortawesome/free-solid-svg-icons'

import './Style.css'
const SelfBlogs = ({userdata}) =>{
	const [imageNum, setimageNum] = useState('')
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(GetAdminBlog(userdata.token));
	}, [])
	const {blogs} = useSelector(state=>state.BlogReducer);
	return(
		<div className="row text-center blogHero no-gutters">
			{
				blogs?.data?.blogs?.map(blog=>(
				<div className="col-md-6 col-12 py-3" key={blog._id}>
					<h3>{blog.title}</h3>
					<div className="card content">
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
			    		<p className="text-left pl-3 pt-2">
			    			<FontAwesomeIcon icon={faHeart} className="fa-1x mr-2 LikeIcon text-dark" />
			    			{blog.likes.length ==0 ? ('Give a First Like'):(blog.likes)}
		    			</p>	
		    			<p className="text-left pl-3 pt-2">
		    				{blog.tags.map(tag=>(
		    						'#'+tag
		    					))}
		    			</p>	
			    	</div>
				</div>
					))
			}
		</div>	
		)
}

export default SelfBlogs