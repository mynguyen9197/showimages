import React from 'react';
import '../App.css';
import Image from './Image';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';

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
			const url = `https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=df190dc2a5b8175b929b817b093ca0cb&extras=owner_name%2C+url_n%2C+views&per_page=20&page=${this.state.curPage}&format=json&nojsoncallback=1`;
			axios.get(url)
		      .then(async(res) => {
		        let imageList = this.state.imageList;
		        await res.data.photos.photo.map(image => imageList.push(image));
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
			<InfiniteScroll
				pageStart={0}
                loadMore={this.loadItems}
                hasMore={this.state.hasMoreItems}
                loader={loader}>

				<div className="App-body">
					{this.state.imageList.map((image, i) => <Image key={i} link={image.url_n} owner={image.ownername} title={image.title} view={image.views}/>)}
				</div>
			</InfiniteScroll>
		);
	}
}

export default Explore;