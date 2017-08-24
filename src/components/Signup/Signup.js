import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connector} from '../../redux/userStore';
import './Signup.css';
import Header from '../Header/Header';

const PATH_BASE = 'https://bondladderpro-v1.herokuapp.com';
const PATH_SIGNUP = '/signup';

class Signup extends Component {
	constructor(props) {
    super(props);
    this.postSignup = this.postSignup.bind(this);
  }

	postSignup() {
		let newUserEmail = document.getElementById('register-email').value;
		var signupData = JSON.stringify({
			username: document.getElementById('register-username').value,
			email: document.getElementById('register-email').value,
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
				this.props.history.push('/clients');
				this.props.addUserEmail(newUserEmail);
			}
		})
		.catch(e => console.log(e));
  }

	render() {
		return (
			<div>
				<Header
					showMenu={false}
				/>
	      <div className="sign-up">
					<div className="row">
		        <div id="signup-form-container" className="col-md-3 col-sm-4 col-xs-12">
							<form id="signup-form">
								<div className="row">
									<div className="col-sm-12">
										<div className="card">
											<div className="card-content">
												<div className="row">
													<div className="input-field col-sm-12">
														<label for="register-username">Username</label>
														<input id="register-username" type="text" className="form-control" name="username"/>
													</div>
												</div>
												<div className="row">
													<div className="input-field col-sm-12">
														<label for="register-email">Email</label>
														<input id="register-email" type="email" className="form-control" name="email"/>
													</div>
												</div>
												<div className="row">
													<div className="input-field col-sm-12">
														<label for="register-password">Password</label>
														<input id="register-password" type="password" className="form-control" name="password"/>
													</div>
												</div>
												<div className="row">
													<div className="input-field col-sm-12">
														<label for="register-passwordConfirm">Confirm Password</label>
														<input id="register-passwordConfirm" type="password" className="form-control" name="passwordConfirm"/>
													</div>
												</div>
											</div>
											<div className="card-action">
												<div className="btn btn-success" onClick={this.postSignup}>Register</div>
											</div>
										</div>
										<div>
											<p className="already-member">Already a member?</p>
											<Link to={"/"} id="log-in-link">Log In</Link>
										</div>
									</div>
								</div>
							</form>
		        </div>
						<div className="col-md-9 col-sm-8 col-xs-12"></div>
					</div>
	      </div>
			</div>
		)
	}
}

export default withRouter(connector(Signup));
