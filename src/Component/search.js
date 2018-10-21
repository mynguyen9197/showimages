import React from 'react';
import '../App.css';
import Thumbnail from './thumbnail';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import NavBar from './NavBar.js';

class Search extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			imageList: [],
			having: true,
			notExist: '',
			hasMoreItems: true,
			curPage: 1,
		}
		this.loadItems = this.loadItems.bind(this);
	}

	loadItems(){ 
		const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=9b0ccd8722b7da4be90436753d1893d6&tags=${this.props.match.params.tag}&extras=owner_name%2C+url_n%2C+views&per_page=20&page=${this.state.curPage}&format=json&nojsoncallback=1`;
		axios.get(url)
		.then(res => {
			let imageList = [];
			res.data.photos.photo.map(image => {
				image.src = `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`
				imageList.push(image)
			});
			if(imageList.length === 0){
				this.setState({ imageList, having: false, notExist: this.props.match.params.tag })
				return;
			}
			if(this.state.curPage<res.data.photos.pages){
	        	const curPage = this.state.curPage+1;
	        	this.setState({ imageList, curPage, having: true });
	        } else {
	        	this.setState({ hasMoreItems: false, having: true });
	        }
		})
	}

	render() {
		return (
			<div className="App">
		        <NavBar type="search" />
				{this.props.match.params.tag?<div className="App-main">
					{this.state.having === false?<div className="warning">Oops! There are no matches for "{this.state.notExist}"<br/>
								Please try broadening your search.</div>
					: <InfiniteScroll
						pageStart={0}
		                loadMore={this.loadItems}
		                hasMore={this.state.hasMoreItems}
		                loader="Loading...">

						<div className="App-body">
							{this.state.imageList.map((image, i) => <Thumbnail key={i} image={image}/>)}
						</div>
					</InfiniteScroll>}
				
				</div>
				:<div className="App-main" />}
			</div>
		);
	}
}

export default Search;