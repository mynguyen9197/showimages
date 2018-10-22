import React from 'react';
import '../App.css';
import Thumbnail from '../Component/thumbnail';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import { addPhotos, removePhotos, changeTag } from '../actions'
import { connect } from 'react-redux'

const mapStateToProps = ({showPhoto, searchTag}) => {
	return {
		photos: showPhoto.photos,
		curPage: showPhoto.curPage,
		tag: searchTag.tag
	}
}

class Search extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			having: true,
			hasMoreItems: true,
		}
		this.loadItems = this.loadItems.bind(this);
	}

	loadItems(){ 
		const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=9b0ccd8722b7da4be90436753d1893d6&tags=${this.props.tag}&extras=owner_name%2C+url_n%2C+views&per_page=20&page=${this.props.curPage}&format=json&nojsoncallback=1`;
		axios.get(url)
		.then(res => {
			let imageList = [];
			res.data.photos.photo.map(image => {
				image.src = `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`
				imageList.push(image)
			});
			if(imageList.length === 0){
				this.setState({ having: false })
				return;
			}
			if(this.props.curPage<res.data.photos.pages){
	        	this.setState({ having: true });
	        	this.props.dispatch(addPhotos({photos:imageList, curPage:this.props.curPage+1}))
	        	this.props.dispatch(changeTag(this.props.tag))
	        } else {
	        	this.setState({ hasMoreItems: false, having: true });
	        }
		})
	}

	render() {
		return (
			<div className="App-main">
				{!this.state.having?<div className="warning">Oops! There are no matches for "{this.props.tag}"<br/>
							Please try broadening your search.</div>
				: <InfiniteScroll
					pageStart={0}
	                loadMore={this.loadItems}
	                hasMore={this.state.hasMoreItems}
	                loader="Loading...">

					<div className="App-body">
						{this.props.photos.map((image, i) => <Thumbnail key={i} image={image}/>)}
					</div>
				</InfiniteScroll>}
			
			</div>
		);
	}
}

export default connect(mapStateToProps)(Search);