import React from 'react';
import '../App.css';
import Info from './info';

class Item extends React.Component {
	render() {
		return (
			<a className="container-img" href={this.props.link}>
				<img src={this.props.link} alt="" />
				<Info owner={this.props.owner} title={this.props.title} view={this.props.view} />
			</a>
		);
	}
}

export default Item;