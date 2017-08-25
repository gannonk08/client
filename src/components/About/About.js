import React, {Component} from 'react';
import './About.css';
import Header from '../Header/Header';

class About extends Component {
	render() {
		return (
			<div>
				<Header
					showMenu={false}
				/>
				<div className="row about-section">
					<div className="about">
					</div>
					<div className="solution">
					</div>
				</div>
			</div>
		)
	}
}

export default About;
