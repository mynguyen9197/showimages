import React from 'react';
import '../App.css';
import Info from './info';
import { Link } from "react-router-dom";

function Item (props) {
	return (
		<Link to={`/photo/${props.image.farm}/${props.image.server}/${props.image.id}/${props.image.secret}/${props.image.ownername}/${props.image.title}/${props.image.views}`} className="container-img">
		<span>
			<img src={props.image.url_n} alt="" />
			<Info owner={props.image.ownername} title={props.image.title} view={props.image.views} />
		</span>
		</Link>
	);
}

export default Item;