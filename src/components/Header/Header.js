import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Header.css';

class Header extends Component {
	render() {
		return (
      <div>
        <header>
          <Link to={"/"}>
            <h1>BondLadderPro</h1>
          </Link>
        </header>
      </div>
		)
	}
}

export default Header;
