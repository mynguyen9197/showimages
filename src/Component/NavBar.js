import React from 'react';
import '../App.css';
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class NavBar extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			curTag: '',
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	handleChange(event) {
		this.setState({curTag: event.target.value});
	}

	handleKeyPress(e) {
	    if (e.key === 'Enter') {
	      this.props.history.push(`/search/${this.state.curTag}`);
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
						<input type="text" value={this.state.curTag} onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
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
export default withRouter(NavBar);