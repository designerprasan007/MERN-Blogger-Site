import { Modal, Button } from 'react-bootstrap'
import { useState } from 'react';
import {UpdateImg} from '../../actions/UsersAction';
import {useDispatch} from 'react-redux';

const SelfEdit = ({userdata}) =>{
	  const [show, setShow] = useState(false);
	  const dispatch = useDispatch();
 	  const [{alt, src, imgdata}, setImg] = useState({
        src: `http://localhost:4500/${userdata.user.profilePic}`,
        alt: 'Upload an Image'
       });

	  const handleClose = () => setShow(false);
	  const handleShow = () => setShow(true);

	    const handleChange = (e) => {
        if(e.target.files[0]) {
            setImg({
            	src: '',
                src: URL.createObjectURL(e.target.files[0]),
                alt: e.target.files[0].name,
                imgdata: e.target.files[0]
            });  
        }   
    }
    const clickImage = () =>{
    	document.getElementById('selectimg').click();
    }
    const handleImgForm = (e) =>{
    	e.preventDefault();
    	let formData = new FormData();
    	formData.append('profilepic', imgdata);
    	dispatch(UpdateImg(formData, userdata.token));
     	setShow(false)	
    }

	return(
		<>
		<div className="text-center pt-3">
			<div className="inputbutton" onClick={handleShow}>
			  <span  className="text">.</span>
			  <img src={`http://localhost:4500/${userdata.user.profilePic}`} className="edit_pic rounded-circle" />
			</div>
		</div>
		<Modal show={show} onHide={handleClose}>
	        <Modal.Header closeButton>
	          <Modal.Title>Change Profile Picture</Modal.Title>
	        </Modal.Header>
	        <Modal.Body>
	        <div className="text-center">
	        <label className="filebutton" style={{backgroundImage : "url(" + `http://localhost:4500/${userdata.user.profilePic}` + ")"}}>
	        	<input type="file" onChange={handleChange} style={{display:'none'}} id="selectimg"  />
	        	</label>
                <img src={src} alt={alt} onClick={clickImage}  className="img-preview rounded-circle"/>
	        </div>
	        </Modal.Body>
	        <Modal.Footer>
	          <Button variant="secondary" onClick={handleClose}>
	            Close
	          </Button>
	          <Button variant="primary" onClick={handleImgForm}>
	            Save Changes
	          </Button>
	        </Modal.Footer>
      	</Modal>
      	<form className="container editForm pt-4">
		  <div className="form-group">
		    <label htmlFor="exampleInputEmail1">Username</label>
		    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
		  </div>
		  <div className="form-group">
		    <label htmlFor="exampleInputPassword1">City</label>
		    <input type="text" className="form-control" id="exampleInputPassword1" />
		  </div>
		  <button type="submit" className="btn btn-primary">Submit</button>
		</form>
		</>
		)
}

export default SelfEdit