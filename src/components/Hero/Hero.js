import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import './Hero.css';

class Hero extends Component {
	render() {
		return (
      <div id="hero-section">
        <div className="hero-text">
          <h1>Bond Ladder Automation made easy</h1>
          <p><Link to={"/about"} id="about-link">Find out more here</Link></p>
        </div>
      </div>
		)
	}
}

export default withRouter(Hero);
