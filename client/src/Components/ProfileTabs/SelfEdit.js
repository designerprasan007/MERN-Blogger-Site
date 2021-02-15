import { Modal, Button } from 'react-bootstrap'
import { useState } from 'react';

const SelfEdit = ({userdata}) =>{
	  const [show, setShow] = useState(false);
 	  const [{alt, src}, setImg] = useState({
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
                alt: e.target.files[0].name
            });  
        }   
    }

	return(
		<>
		<div className="text-center pt-3">
			<div className="inputbutton" onClick={handleShow}>
			  <span  className="text">.</span>
			  <img style={{backgroundImage : "url(" + `http://localhost:4500/${userdata.user.profilePic}` + ")"}} className="edit_pic rounded-circle" />
			</div>
		</div>
		<Modal show={show} onHide={handleClose}>
	        <Modal.Header closeButton>
	          <Modal.Title>Change Profile Picture</Modal.Title>
	        </Modal.Header>
	        <Modal.Body>
	        <div className="text-center">
	        <label className="filebutton" style={{backgroundImage : "url(" + `http://localhost:4500/${userdata.user.profilePic}` + ")"}}>
	        	<input type="file" onChange={handleChange} />
	        	</label>
                <img src={src} alt={alt}  className="img-preview rounded-circle"/>
	        </div>
	        </Modal.Body>
	        <Modal.Footer>
	          <Button variant="secondary" onClick={handleClose}>
	            Close
	          </Button>
	          <Button variant="primary" onClick={handleClose}>
	            Save Changes
	          </Button>
	        </Modal.Footer>
      	</Modal>
		</>
		)
}

export default SelfEdit