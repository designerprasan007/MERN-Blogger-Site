import {useState} from 'react';
const CreateBlog = () =>{
	const AvailableTags = ['Education', 'Sports', 'Food', 'Travel', 'World']
	const [tags, SetTags] = useState('');
	const [suggest, SetSuggest] = useState([])

	const handlechange = (e) =>{
		console.log(e.target.value)
		SetTags(e.target.value);
		function filterItems(arr, query) {
		  return arr.filter(function(el) {
		      return el.toLowerCase().indexOf(query.toLowerCase()) !== -1
		  })
		}

		SetSuggest(filterItems(AvailableTags, e.target.value))
	}

	const getTag = (e) =>{
		SetTags(e.target.innerHTML);

	}
	return (
		<div className="container-fluid">
			<div className="shadow-lg p-3  my-5 bg-white rounded">
				<div className="card">
					<div className="card-body">
						<div className="titleDiv">
							<p><strong>Titile</strong></p>
							<small>Give a Title that another person can understand</small>
							    <input type="email" className="form-control mt-3"  aria-describedby="emailHelp" />
						</div>
						<div className="titleDiv pt-5">
							<p><strong>Body</strong></p>
							<small>Give a Title that another person can understand</small>
							    <textarea className="form-control mt-3" id="exampleFormControlTextarea1" rows="6"></textarea>
						</div>
						<div className="titleDiv pt-5">
							<p><strong>Tags</strong></p>
							<small>Give a Title that another person can understand</small>
							    <input type="email" onChange={handlechange} value={tags} className="form-control my-3"  aria-describedby="emailHelp" />
							    {suggest ? (suggest.map((tag, i) =>{
						    	return(<span key={i} onClick={getTag}>{tag }, </span>)
						    	})): ''}
						</div>
					</div>
				</div>
			</div>	

		</div>
		)
}


export default CreateBlog