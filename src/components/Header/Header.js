import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connector} from '../../redux/userStore';
import onClickOutside from 'react-onclickoutside';
import './Header.css';
import HeaderMenu from '../HeaderMenu/HeaderMenu';

class Header extends Component {
	constructor(props) {
    super(props);
    this.toggleHeaderMenu = this.toggleHeaderMenu.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = {
      flipped: false,
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
		let lastEmail = this.props.emails[this.props.emails.length-1];
		// eslint-disable-next-line
		const { showMenu } = this.props;
		return (
      <div>
        <header>
          <Link to={"/"}>
            <h1>BondLadderPro</h1>
          </Link>
					<div id="nav-dropdown" className={this.props.showMenu} onClick={this.toggleHeaderMenu} onMouseEnter={this.mouseEnter}>
						<div id="user-name">{lastEmail}</div>
						<img className={this.state.flipped} id="down-arrow" src={require("./images/down.png")} alt="down" />
						<img className={this.state.flipped} id="up-arrow" src={require("./images/up.png")} alt="up" />
					</div>
        </header>
				{
          this.state.flipped
          	? <HeaderMenu />
            : null
        }
      </div>
		)
	}
}

export default connector(onClickOutside(Header));
