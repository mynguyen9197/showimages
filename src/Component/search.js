import React from 'react';
import '../App.css';
import Thumbnail from './thumbnail';
import NavBar from './NavBar.js';
import TagContainer from '../Containers/tagContainer'

class Search extends React.Component {
	
	render() {
		return (
			<div className="App">
		        <NavBar type="search" />
				{this.props.match.params.tag?<TagContainer />:<div />}
			</div>
		);
	}
}

export default Search;