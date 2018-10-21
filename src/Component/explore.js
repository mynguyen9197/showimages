import React from 'react';
import '../App.css';
import Thumbnail from './thumbnail';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import NavBar from './NavBar.js';

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
		const url = `https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=9b0ccd8722b7da4be90436753d1893d6&date=2018-10-01&extras=owner_name%2C+url_n%2C+views&per_page=20&page=${this.state.curPage}&format=json&nojsoncallback=1`;
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
		        <NavBar type="explore"/>
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