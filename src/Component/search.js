import React from 'react';
import '../App.css';
import Thumbnail from './thumbnail';
import axios from 'axios';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class Search extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			imageList: [],
			curTag: '',
			searchResult: [],
			having: true,
			notExist: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}	

	componentDidMount(){
		const url = `https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=9b0ccd8722b7da4be90436753d1893d6&extras=owner_name%2C+url_n%2C+views%2C+tags&per_page=500&format=json&nojsoncallback=1`;
		axios.get(url)
		.then(res => {
			let imageList = [];
			res.data.photos.photo.map(image => {
				image.src = `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`
				imageList.push(image)
			});
			this.setState({ imageList });
		})
	}

	handleChange(event) {
		this.setState({curTag: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();
		let searchResult = [];
		this.state.imageList.map(image => {
			if(image.tags.includes(this.state.curTag.toLowerCase())){
				searchResult.push(image)
			}
		})
		if(searchResult.length === 0){
			this.setState({ searchResult, having: false, notExist: this.state.curTag })
		} else {
			this.setState({ searchResult, having: true })
		}		
	}

	handleKeyPress(e) {
	    if (e.key === 'Enter') {
	      document.getElementById('btn').click();
	    } else {
	    	return;
	    }
	}

	render() {
		return (
			<div className="App">
		        <div className="App-nav">
		          <div className="App-nav-content">
		            <div><span></span></div>
		            <div><a href="/" className="logo">MY COLLECTION</a></div>
		            <ul className="menu-nav">
		              <li><Link to="/">Explore</Link></li>
		            </ul>
					<ul className="tool-nav">
						<li>
						<form action="" method="get" id="myForm" onSubmit={this.handleSubmit}>
							<label>
								<button id="btn" type="submit"><FontAwesomeIcon icon={faSearch} /></button>
								<input type="text" value={this.state.curTag} onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
							</label>
						</form>
						</li>
						
					</ul>
					</div>
				</div>
				<div className="App-main">
				{this.state.having === false?<div className="warning">Oops! There are no matches for "{this.state.notExist}"<br/>
							Please try broadening your search.</div>
				:<div className="App-body">
						{this.state.searchResult.map((image, i) => <Thumbnail key={i} image={image}/>)}
				</div>}
				</div>
			</div>
		);
	}
}

export default Search;