import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Loader from 'react-loader';
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
      changeFormVisible: false,
			loaded: true
    };
  }

	getLogout() {
		this.setState({ loaded: false });
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
				this.setState({ loaded: true });
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
		let { loaded } = this.state;
		return (
			<Loader loaded={loaded}>
	      <div id="header-menu">
					<div id="log-out" onClick={this.getLogout}>Log Out</div>
					<div id="change-password" onClick={this.toggleChangeForm}>Change Password</div>
					{
	          this.state.changeFormVisible
	            ? <ChangePassword />
	            : null
	        }
	      </div>
			</Loader>
		)
	}
}

export default withRouter(HeaderMenu);
