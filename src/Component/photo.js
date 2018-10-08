import React from 'react';
import '../App.css';
import { Link } from "react-router-dom";
import photo from '../ico/if_andrew_60496.png';
import axios from 'axios';

class Photo extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			imageList: [],
			curPhoto: {},
		}
	}

	componentDidMount(){
		const url = `https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=9b0ccd8722b7da4be90436753d1893d6&extras=description%2C+views%2C+owner_name%2C+date_taken&per_page=500&format=json&nojsoncallback=1`;
		axios.get(url)
		.then(res => {
			const curId = this.props.match.params.id;
			let imageList = [];
			let curPhoto = this.state.curPhoto;
			res.data.photos.photo.map(image => {
				if(image.id === curId){
					curPhoto = image;
				}
				image.src = `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`
				imageList.push(image)
			});
			this.setState({ imageList, curPhoto });
		})
	}

	formatDate(date) {
		const d = new Date(date).getMonth()+1;
		const y = new Date(date).getFullYear();
		let m = ''
		switch(new Date(date).getMonth()+1){
			case 1: m = 'January';break;
			case 2: m = 'February';break;
			case 3: m = 'March';break;
			case 4: m = 'April';break;
			case 5: m = 'May';break;
			case 6: m = 'June';break;
			case 7: m = 'July';break;
			case 8: m = 'August';break;
			case 9: m = 'September';break;
			case 10: m = 'Octobor';break;
			case 11: m = 'November';break;
			case 12: m = 'December';break;
		}
		return m + ' ' + d + ',' +' ' + y; 
	}

	render(){
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
						<div className="photo-content"><img src={ this.state.curPhoto.src } /></div>
					</div>
					<div className="photo-info">
						<div className="photo-left">
							<div className="photo-avatar"><img src={photo} /></div>
							<div  className="photo-contain-left">
								<a className="photo-author" href="">{this.state.curPhoto.ownername}</a>
								<div><button className="photo-btn-left">Follow</button></div>
								<div className="photo-title"><h4>{this.state.curPhoto.title}</h4></div>
							</div>
							
						</div>
						<div className="photo-right">
							<div className="photo-view">
								{this.state.curPhoto.views}
								<div className="photo-right-note">views</div>
							</div>
							<div className="photo-datetaken">
								Taken on {this.formatDate(this.state.curPhoto.datetaken)}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Photo;