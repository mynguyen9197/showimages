import React from 'react';
import '../App.css';
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import { changeTag, addPhotos, removePhotos } from '../actions'
import axios from 'axios'

class NavBar extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			curTag: '',
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({curTag: event.target.value});
	}

	handleSubmit(e){
		e.preventDefault();
		if(this.state.curTag!=''){
			this.props.dispatch(removePhotos())
			this.props.dispatch(changeTag(this.state.curTag))
			const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=9b0ccd8722b7da4be90436753d1893d6&tags=${this.state.curTag}&extras=owner_name%2C+url_n%2C+views&per_page=20&page=1&format=json&nojsoncallback=1`;
			axios.get(url)
			.then(res => {
				if(res.data.photos.photo.length)
				this.props.dispatch(addPhotos({photos: res.data.photos.photo, curPage: 2}))
			})
			this.props.history.push(`/search/${this.state.curTag}`);
		}
	}

	handleKeyPress(e) {
	    if (e.key === 'Enter') {
	      document.getElementById('btn').click();
	    } 
	}

	render(){
		return (
			<div className="App-nav">
	          <div className="App-nav-content">
	            <div><span></span></div>
	            <div><a href="/" className="logo">MY COLLECTION</a></div>
	            <ul className="menu-nav">
	              <li><a href="/">You</a></li>
	              <li><a href="/">Get Pro</a></li>
	            </ul>
	            
	            {this.props.type === 'explore'?
	              <li><Link to="/search/">Search Tag</Link></li>
	            : this.props.type === 'search'? <ul className="tool-nav">
	              	<li>
						<form onSubmit={this.handleSubmit}>
							<input onChange={this.handleChange} onKeyPress={this.handleKeyPress} value={this.props.tag}/>
	        				<button type="submit" id="btn">Search</button>
						</form>
					</li>
					<li><Link to="/">Explore</Link></li>
				</ul>
				: 	<ul className="tool-nav">
		              <li><Link to="/">Explore</Link></li>
		              <li><Link to="/search/">Search Tag</Link></li>
		            </ul>
	            }
	          </div>
	        </div>
		)
	}
}
export default withRouter(connect()(NavBar)) ;