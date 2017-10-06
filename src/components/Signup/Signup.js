import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connector} from '../../redux/store';
import Loader from 'react-loader';

let PATH_BASE = '';
process.env.NODE_ENV === 'production'
? PATH_BASE = process.env.REACT_APP_API_PROD
: PATH_BASE = process.env.REACT_APP_API_DEV;

const PATH_SIGNUP = '/signup';

class Signup extends Component {
	constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
		this.state = { loaded: true };
  }

	onSubmit = (e) => {
		e.preventDefault();
		this.setState({ loaded: false });
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
			if (res.status === "OK") {
				localStorage.setItem('activeSession', true);
				localStorage.setItem('user', newUserEmail);
				localStorage.setItem('uploadId', 0);
				this.setState({ loaded: true });
				this.props.history.push('/clients/import');
			}
		})
		.catch(e => {
			console.log(e);
			this.setState({ loaded: true });
		});
  }

	getSigninComponent() {
		this.props.authenticateComponent("signin");
	}

	render() {
		let { loaded } = this.state;
		return (
			<div>
				<form onSubmit={this.onSubmit}>
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
						<button type="submit" className="log-in-button btn btn-primary">Register</button>
					</div>
				</form>
				<Loader loaded={loaded}>
				</Loader>
			</div>
		)
	}
}

export default withRouter(Signup);
