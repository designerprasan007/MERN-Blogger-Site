import {useState, useEffect} from 'react';
import Select from 'react-select'
import {useDispatch} from 'react-redux';
import {CreateBlogFun} from '../../actions/BlogController';

const CreateBlog = ({userdata}) =>{
	const [tags, SetTags] = useState([]);
	const [title, SetTitle] = useState('');
	const [body, SetBody] = useState('');
	const [{src1, imgdata1}, setImg1] = useState({
        src1: '',
        imgdata1: '',
    });
    const [{src2, imgdata2}, setImg2] = useState({
        src2: '',
        imgdata2:''
    });
	const [{src3, imgdata3}, setImg3] = useState({
        src3: '',
        imgdata3:''
    });

	const dispatch = useDispatch();

	const AvailableTags = [
		  { value: 'Education', label: 'Education' },
		  { value: 'Sports', label: 'Sports' },
		  { value: 'Food', label: 'Food' },
		  { value: 'Travel', label: 'Travel' },
		  { value: 'World', label: 'World' }
		]

	const handlechange = (options) =>{
		SetTags(options);
	}
	const handleImag1 = (e) =>{
		 if(e.target.files[0]) {
            setImg1({
                src1: URL.createObjectURL(e.target.files[0]),
                imgdata1: e.target.files[0]
            });    
        }   
	}

	const handleImag2 = (e) =>{
		 if(e.target.files[0]) {
            setImg2({
                src2: URL.createObjectURL(e.target.files[0]),
                imgdata2: e.target.files[0]

            });    
        }   
	}
	const handleImag3 = (e) =>{
		 if(e.target.files[0]) {
            setImg3({
                src3: URL.createObjectURL(e.target.files[0]),
                imgdata3: e.target.files[0]

            });    
        }   
	}

	const handleSubmit = (e) =>{
		e.preventDefault();
		const tagsValue = tags.map((tag)=>{
			return tag.value;
		})
		let formData = new FormData();
		formData.append('blogimg', imgdata1);
		formData.append('blogimg', imgdata2);
		formData.append('blogimg', imgdata3);
		formData.append('title', title);
		formData.append('body', body);
		formData.append('tags', tagsValue);
		dispatch(CreateBlogFun(formData, userdata.token))
	}


	return (
		<div className="container-fluid">
			<div className="shadow-lg p-3  my-5 bg-white rounded">
				<div className="card">
					<div className="card-body">
						<div className="titleDiv">
							<p><strong>Titile</strong></p>
							<small>Give a Title that another person can understand</small>
							    <input type="text" onChange={(e) => SetTitle(e.target.value)} value={title} className="form-control mt-3"  aria-describedby="emailHelp" />
						</div>
						<div className="py-3">
							<p><strong>Choose Image</strong></p>
							<div>
								<input type="file" onChange={handleImag1} />
								<img src={src1} className="showPreview" />
							</div>
							<div>
								<input type="file" onChange={handleImag2} />
								<img src={src2} className="showPreview" />
							</div>
							<div>
								<input type="file" onChange={handleImag3} />
								<img src={src3} className="showPreview" />
							</div>
						</div>
						<div className="titleDiv pt-5">
							<p><strong>Body</strong></p>
							<small>Give a Title that another person can understand</small>
							    <textarea className="form-control mt-3" id="exampleFormControlTextarea1"  onChange={(e) => SetBody(e.target.value)} value={body} rows="6"></textarea>
						</div>
						<div className=" pt-5">
							<p><strong>Tags</strong></p>
							<small>Give a Title that another person can understand</small>
							    <Select isMulti onChange={handlechange} value={tags}
									    name="colors"
									    className="basic-multi-select"
									    classNamePrefix="select"
									    options={AvailableTags} />
						</div>
						<div className="py-3">
							<button className="btn btn-success" onClick={handleSubmit}>Submit</button>
						</div>
					</div>
				</div>
			</div>	

		</div>
		)
}


export default CreateBlog