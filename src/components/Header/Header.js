import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connector} from '../../redux/userStore';
import './Header.css';
import HeaderMenu from '../HeaderMenu/HeaderMenu';

class Header extends Component {
	constructor(props) {
    super(props);
    this.showHeaderMenu = this.showHeaderMenu.bind(this);
    this.state = {
      flipped: false,
			clicked: false
    };
  }

	showHeaderMenu() {
		this.setState({ clicked: !this.state.clicked });
		this.setState({ flipped: !this.state.flipped });
	}

	render() {
		const { showMenu } = this.props;
		let lastEmail = this.props.emails[this.props.emails.length-1];
		return (
      <div>
        <header>
          <Link to={"/"}>
            <h1>BondLadderPro</h1>
          </Link>
					<div id="nav-dropdown" className={this.props.showMenu} onClick={this.showHeaderMenu}>
						<div id="user-name">{lastEmail}</div>
						<img className={this.state.flipped} id="down-arrow" src={require("./down.png")} alt="down" />
						<img className={this.state.flipped} id="up-arrow" src={require("./up.png")} alt="up" />
					</div>
        </header>
				{
          this.state.clicked
          	? <HeaderMenu />
            : null
        }
      </div>
		)
	}
}

export default connector(Header);
