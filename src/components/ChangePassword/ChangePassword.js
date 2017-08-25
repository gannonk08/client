import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import './ChangePassword.css';

const PATH_BASE = "https://bondladderpro-v1.herokuapp.com";
const PATH_SIGNOUT = '/signout';
const PATH_CHANGEPASSWORD = '/password/change';

class ChangePassword extends Component {
	constructor(props) {
    super(props);
    this.getLogout = this.getLogout.bind(this);
		this.changePassword = this.changePassword.bind(this);
  }

	getLogout() {
		let bondladderproAuth = process.env.BONDLADDERPRO_AUTH;
		fetch(PATH_BASE + PATH_SIGNOUT, {
			mode: 'cors',
			credentials: 'include',
		  method: 'GET',
			headers: {
				'Access-Control-Allow-Origin': '*',
		    'Accept': '*/*',
		    'Content-Type': 'application/json',
				'Set-Cookie': bondladderproAuth
		  }
		})
		.then(response => response.json())
		.then(res => {
			if (res.status === "OK") {
				this.props.history.push('/');
			}
		})
		.catch(e => console.log(e));
  }

	changePassword() {
		let bondladderproAuth = process.env.BONDLADDERPRO_AUTH;
		fetch(PATH_BASE + PATH_CHANGEPASSWORD, {
			mode: 'cors',
			credentials: 'include',
		  method: 'POST',
			headers: {
				'Access-Control-Allow-Origin': '*',
		    'Accept': '*/*',
		    'Content-Type': 'application/json',
				'Set-Cookie': bondladderproAuth
		  }
		})
		.then(response => response.json())
		.then(res => {
			if (res.status === "OK") {
				this.getLogout();
			}
		})
		.catch(e => console.log(e));
  }

	render() {
		return (
			<div id="changepass-form-container">
				<form id="changepass-form">
					<div className="row">
						<label for="current-password">Current Password</label>
						<input id="current-password" type="password" className="form-control" name="current-password"/>
					</div>
					<div className="row">
						<label for="new-password">New Password</label>
						<input id="new-password" type="password" className="form-control" name="new-password"/>
					</div>
					<div className="row">
						<label for="confirm-new-password">Confirm New Password</label>
						<input id="confirm-new-password" type="password" className="form-control" name="confirm-new-password"/>
					</div>
					<div className="row" id="change-button">
						<div className="btn btn-success" onClick={this.changePassword}>Change Password</div>
					</div>
				</form>
			</div>
		)
	}
}

export default withRouter(ChangePassword);
