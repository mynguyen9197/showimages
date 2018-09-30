import React from 'react';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

class Info extends React.Component {
	render() {
		return (
			<div class="info">
				<div className="left">
					<div className="text-title"><a href="#">{this.props.title}</a></div>
					<div className="text-owner"><a href="#">by {this.props.owner}</a></div>
				</div>
				<div className="right">
					<FontAwesomeIcon icon={faEye} />&nbsp;{this.props.view}
				</div>
			</div>
		)
	}
}

export default Info;