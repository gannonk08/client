import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connector} from '../../redux/store';
import onClickOutside from 'react-onclickoutside';
import './Header.css';
import HeaderMenu from '../HeaderMenu/HeaderMenu';

class Header extends Component {
	constructor(props) {
    super(props);
    this.toggleHeaderMenu = this.toggleHeaderMenu.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
		let storedEmail = localStorage.getItem("user");
    this.state = {
      flipped: false,
			userEmail: storedEmail
    };
  }

	handleClickOutside = evt => {
		this.setState({ flipped: false });
  }

	toggleHeaderMenu() {
		this.setState({ flipped: !this.state.flipped });
	}

	mouseEnter() {
		if (!this.state.flipped) {
			this.setState({ flipped: true });
		}
	}

	render() {
		const { flipped, userEmail } = this.state;
		const { showMenu } = this.props;
		return (
      <div>
        <header>
          <Link to={"/clients"}>
            <h1>BondLadderPro</h1>
          </Link>
					<div id="nav-dropdown" className={showMenu} onClick={this.toggleHeaderMenu} onMouseEnter={this.mouseEnter}>
						<div id="user-name">{userEmail}</div>
						<img className={flipped} id="down-arrow" src={require("./images/down.png")} alt="down" />
						<img className={flipped} id="up-arrow" src={require("./images/up.png")} alt="up" />
					</div>
        </header>
				{
          flipped
          	? <HeaderMenu />
            : null
        }
      </div>
		)
	}
}

export default onClickOutside(Header);
