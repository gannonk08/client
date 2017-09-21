import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connector} from '../../redux/userStore';

let PATH_BASE = '';
process.env.NODE_ENV === 'production'
? PATH_BASE = process.env.REACT_APP_API_PROD
: PATH_BASE = process.env.REACT_APP_API_DEV;

const PATH_SIGNUP = '/signup';

class Signup extends Component {
	constructor(props) {
    super(props);
    this.postSignup = this.postSignup.bind(this);
    this.getSigninComponent = this.getSigninComponent.bind(this);
  }

	postSignup() {
		let newUserEmail = document.getElementById('register-email').value;
		var signupData = JSON.stringify({
			username: document.getElementById('register-username').value,
			email: document.getElementById('register-email').value,
			firmName: document.getElementById('register-firm').value,
			password: document.getElementById('register-password').value,
			passwordConfirm: document.getElementById('register-passwordConfirm').value
		})
		fetch(PATH_BASE + PATH_SIGNUP, {
			mode: 'cors',
			credentials: 'include',
		  method: 'POST',
			headers: {
				'Access-Control-Allow-Origin': '*',
		    'Accept': '*/*',
		    'Content-Type': 'application/json'
		  },
		  body: signupData
		})
		.then(response => response.json())
		.then(res => {
			console.log(res);
			if (res.status === "OK") {
				this.props.history.push('/clients');
				this.props.addUserEmail(newUserEmail);
			}
		})
		.catch(e => console.log(e));
  }

	getSigninComponent() {
		this.props.authenticateComponent("signin");
	}

	render() {
		return (
			<div>
				<div className="username">
					<label htmlFor="register-username">Username</label>
					<input id="register-username" type="text" className="form-control" name="register-username"/>
				</div>
				<div className="email">
					<label htmlFor="register-email">Email</label>
					<input id="register-email" type="email" className="form-control" name="register-email"/>
				</div>
				<div className="firm">
					<label htmlFor="register-firm">Firm Name</label>
					<input id="register-firm" type="text" className="form-control" name="register-firm"/>
				</div>
				<div className="password">
					<label htmlFor="register-password">Password</label>
					<input id="register-password" type="password" className="form-control" name="register-password"/>
				</div>
				<div className="confirm-password">
					<label htmlFor="register-passwordConfirm">Confirm Password</label>
					<input id="register-passwordConfirm" type="password" className="form-control" name="register-passwordConfirm"/>
				</div>
				<div className="buttons">
					<div className="log-in-button btn btn-primary" onClick={this.postSignup}>Register</div>
				</div>
			</div>
		)
	}
}

export default withRouter(connector(Signup));
