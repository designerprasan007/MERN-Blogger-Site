import {useState, useEffect} from 'react';
import Select from 'react-select'

const CreateBlog = () =>{
	const [tags, SetTags] = useState([]);
	const [title, SetTitle] = useState('');
	const [body, SetBody] = useState('');
	  const [{alt, src}, setImg] = useState({
        src: '',
    });


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

	const handleSubmit = (e) =>{
		const tagsValue = tags.map((tag)=>{
			return tag.value;
		})
		console.log(title, body, tagsValue);
	}

	const handleImag = (e) =>{
		 if(e.target.files[0]) {
            setImg({
                src: URL.createObjectURL(e.target.files[0]),
                alt: e.target.files[0].name
            });    
        }   
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
							<input type="file" onChange={handleImag} />
							<img src={src} alt={alt} />
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