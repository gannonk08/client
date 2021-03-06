import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import './ChangePassword.css';

let PATH_BASE = '';
process.env.NODE_ENV === 'production'
? PATH_BASE = process.env.REACT_APP_API_PROD
: PATH_BASE = process.env.REACT_APP_API_DEV;

const PATH_SIGNOUT = '/signout';
const PATH_CHANGEPASSWORD = '/password/change';

class ChangePassword extends Component {
	constructor(props) {
    super(props);
    this.getLogout = this.getLogout.bind(this);
		this.changePassword = this.changePassword.bind(this);
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
				this.props.history.push('/');
			}
		})
		.catch(e => console.log(e));
  }

	changePassword() {
		var changeData = JSON.stringify({
			old: document.getElementById('current-password').value,
			new: document.getElementById('new-password').value,
			confirm: document.getElementById('confirm-new-password').value
		})
		fetch(PATH_BASE + PATH_CHANGEPASSWORD, {
			mode: 'cors',
			credentials: 'include',
		  method: 'POST',
			headers: {
				'Access-Control-Allow-Origin': '*',
		    'Accept': '*',
		    'Content-Type': 'application/json'
		  },
			body: changeData
		})
		.then(res => {
			if (res.ok) {
				return this.getLogout();
			}
		})
		.catch(e => {
			console.log(e);
			return this.getLogout();
		});
  }

	render() {
		return (
			<div id="changepass-form-container">
				<form id="changepass-form">
					<div className="row">
						<label htmlFor="current-password">Current Password</label>
						<input id="current-password" type="password" className="form-control" name="current-password"/>
					</div>
					<div className="row">
						<label htmlFor="new-password">New Password</label>
						<input id="new-password" type="password" className="form-control" name="new-password"/>
					</div>
					<div className="row">
						<label htmlFor="confirm-new-password">Confirm New Password</label>
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
