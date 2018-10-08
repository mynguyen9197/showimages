import React from 'react';
import '../App.css';
import { Link } from "react-router-dom";
import photo from '../ico/if_andrew_60496.png'

function Photo (props) {
	const match = props.match;
	const img = `https://farm${match.params.farm}.staticflickr.com/${match.params.server}/${match.params.id}_${match.params.secret}.jpg`
	return (
		<div className="App">
	        <div className="App-nav">
	          <div className="App-nav-content">
	            <div><span></span></div>
	            <div><a href="/" className="logo">MY COLLECTION</a></div>
	            <ul className="menu-nav">
	              <li><a href="/">You</a></li>
	              <li><a href="/">Explore</a></li>
	              <li><a href="/">Create</a></li>
	              <li><a href="/">Get Pro</a></li>
	            </ul>
	            <ul className="tool-nav">
	              <li><Link to="/">Explore</Link></li>
	              <li><Link to="/search">Search Tag</Link></li>
	            </ul>
	          </div>
	        </div>
			<div className="App-main">
				<div className="photo-image">
					<div className="photo-content"><img src={ img } /></div>
				</div>
				<div className="photo-info">
					<div className="photo-left">
						<div className="photo-avatar"><img src={photo} /></div>
						<div  className="photo-contain-left">
							<a className="photo-author" href="">{match.params.author}</a>
							<span><button>Follow</button></span>
						</div>
						<div className="photo-title"><h3>{match.params.title}</h3></div>
					</div>
					<div className="photo-right">
						<div className="photo-view">
							{match.params.view}
							<div className="photo-right-note">views</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Photo;