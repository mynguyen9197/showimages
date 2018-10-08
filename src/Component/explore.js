import React from 'react';
import '../App.css';
import Thumbnail from './thumbnail';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import { Link } from "react-router-dom";

class Explore extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			imageList: [],
			hasMoreItems: true,
			curPage: 1,
		}
		this.loadItems = this.loadItems.bind(this);
	}	

	loadItems(){
			const url = `https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=9b0ccd8722b7da4be90436753d1893d6&extras=owner_name%2C+url_n%2C+views&per_page=20&page=${this.state.curPage}&format=json&nojsoncallback=1`;
			axios.get(url)
		      .then(res => {
		      	let imageList = this.state.imageList;
		        res.data.photos.photo.map(image => {
		        	image.src = `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`
		        	imageList.push(image)
		        });
		        if(this.state.imageList.length<500){
		        	const curPage = this.state.curPage+1;
		        	this.setState({ imageList, curPage });
		        } else {
		        	this.setState({ hasMoreItems: false });
		        }
		      })
	}

	render() {
		const loader = <div className="loader">Loading ...</div>;
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
		              <li><Link to="/search">Search Tag</Link></li>
		            </ul>
		          </div>
		        </div>
				<InfiniteScroll
					pageStart={0}
	                loadMore={this.loadItems}
	                hasMore={this.state.hasMoreItems}
	                loader={loader}>

	                <div className="App-main">
						<div className="App-body">
							{this.state.imageList.map((image, i) => <Thumbnail key={i} image={image}/>)}
						</div>
					</div>
				</InfiniteScroll>
			</div>
		);
	}
}

export default Explore;