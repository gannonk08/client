import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import './HeaderMenu.css';
import ChangePassword from '../ChangePassword/ChangePassword';

let PATH_BASE = '';
process.env.NODE_ENV === 'production'
? PATH_BASE = process.env.REACT_APP_API_PROD
: PATH_BASE = process.env.REACT_APP_API_DEV;

const PATH_SIGNOUT = '/signout';

class HeaderMenu extends Component {
	constructor(props) {
    super(props);
    this.getLogout = this.getLogout.bind(this);
    this.toggleChangeForm = this.toggleChangeForm.bind(this);
		this.state = {
      changeFormVisible: false
    };
  }

	getLogout() {
		fetch(PATH_BASE + PATH_SIGNOUT, {
			mode: 'cors',
			credentials: 'include',
		  method: 'GET',
			headers: {
				'Access-Control-Allow-Origin': '*',
		    'Accept': '*/*',
		    'Content-Type': 'application/json'
		  }
		})
		.then(res => {
			if (res.ok) {
				localStorage.clear();
				this.props.history.push('/');
			}
		})
		.catch(e => console.log(e));
  }

	toggleChangeForm() {
		this.setState({ changeFormVisible: !this.state.changeFormVisible });
	}

	render() {
		return (
      <div id="header-menu">
				<div id="log-out" onClick={this.getLogout}>Log Out</div>
				<div id="change-password" onClick={this.toggleChangeForm}>Change Password</div>
				{
          this.state.changeFormVisible
            ? <ChangePassword />
            : null
        }
      </div>
		)
	}
}

export default withRouter(HeaderMenu);
