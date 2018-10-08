import React from 'react';
import '../App.css';
import Info from './info';
import { Link } from "react-router-dom";

function Item (props) {
	return (
		<Link to={`/photo/${props.image.id}`} className="container-img">
		<span>
			<img src={props.image.url_n} alt="" />
			<Info owner={props.image.ownername} title={props.image.title} view={props.image.views} />
		</span>
		</Link>
	);
}

export default Item;