import React from 'react';
import '../App.css';
import NavBar from './NavBar.js'
import photo from '../ico/if_andrew_60496.png';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { changeTag, addPhotos, removePhotos } from '../actions'
import { connect } from 'react-redux'

class Photo extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			src: '',
			ownername:'',
			title:'',
			comments: '',
			date: '',
			views: '',
			description: '',
			tags: []
		}
	}

	componentDidMount(){
		const url = `https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=9b0ccd8722b7da4be90436753d1893d6&photo_id=${this.props.match.params.id}&format=json&nojsoncallback=1`;
		axios.get(url)
		.then(res => {
			const curPhoto = res.data.photo
			const src = `https://farm${res.data.photo.farm}.staticflickr.com/${res.data.photo.server}/${res.data.photo.id}_${res.data.photo.secret}.jpg`
			const ownername = res.data.photo.owner.realname
			const title = res.data.photo.title._content
			const comments = res.data.photo.comments._content
			const date = res.data.photo.dates.taken
			const views = res.data.photo.views
			const description = res.data.photo.description._content
			const tags = res.data.photo.tags.tag
			this.setState({ src, ownername, title, comments, date, views, description, tags });
		})
	}

	formatDate(date) {
		const dateTaken = date.split(" ")[0].split("-");
		const d = dateTaken[2];
		const y = dateTaken[0];
		let m = ''
		switch(parseInt(dateTaken[1])){
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

	handleClick(tag){
		this.props.dispatch(removePhotos())
		this.props.dispatch(changeTag(tag))
		this.props.history.push(`/search/${tag}`)
	}

	render(){
		return (
			<div className="App">
		        <NavBar />
				<div className="App-main">
					<div className="photo-image">
						<div className="photo-content"><img src={ this.state.src } /></div>
					</div>
					<div className="photo-info">
						<div className="photo-left">
							<div className="photo-avatar"><img src={photo} /></div>
							<div  className="photo-contain-left">
								<a className="photo-author" href="">{this.state.ownername}</a>
								<div><button className="photo-btn-left">Follow</button></div>
							</div>
							<div className="photo-title">{this.state.title}</div><br />
							<p className="photo-description">{this.state.description}</p>
						</div>
						<div className="photo-right">
							<div className="photo-view">
								<span>{this.state.views}</span><br />
								<span className="photo-right-note">views</span>
							</div>
							<div className="photo-com">
								<span>{this.state.comments}</span> <br />
								<span className="photo-right-com">comments</span>
							</div>
							<div className="photo-datetaken">
								Taken on {this.formatDate(this.state.date)}
							</div>
							<div className="tag">Tags</div><br />
							<ul className="tag-list">
								{this.state.tags.map((tag, i) => 
									<li className="li-tag" key={i} onClick={this.handleClick.bind(this, tag._content)}>
										<a >{tag.raw}</a>
									</li>
								)}
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(connect()(Photo));