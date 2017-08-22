import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Footer.css';

class Footer extends Component {
	render() {
		return (
      <div>
				<footer>
					<small>&copy; BondLadderPro Inc.</small>
					<Link to={"/about"}>About</Link>
				</footer>
      </div>
		)
	}
}

export default Footer;
