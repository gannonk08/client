import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Signup.css';

const PATH_BASE = 'http://localhost:9000';
const PATH_SIGNUP = '/signup';

class Login extends Component {
	constructor(props) {
    super(props);
    this.postSignup = this.postSignup.bind(this);
  }

	postSignup() {
		var formData = JSON.stringify({
			username: document.getElementById('username').value,
			email: document.getElementById('email').value,
			password: document.getElementById('password').value
		})
		fetch(PATH_BASE + PATH_SIGNUP, {
		  method: "POST",
		  body: formData
		})
		.then(response => response.json()).catch(e => console.log(e));
  }

	render() {
		return (
			<div>
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
														<label for="input-username">Username</label>
														<input id="input-username" type="text" className="form-control" name="username" value="" />
													</div>
												</div>
												<div className="row">
													<div className="input-field col-sm-12">
														<label for="input-email">Email</label>
														<input id="input-email" type="email" className="form-control" name="email" value="" />
													</div>
												</div>
												<div className="row">
													<div className="input-field col-sm-12">
														<label for="input-password">Password</label>
														<input id="input-password" type="password" className="form-control" name="password" value="" />
													</div>
												</div>
												<div className="row">
													<div className="input-field col-sm-12">
														<label for="input-passwordConfirm">Confirm Password</label>
														<input id="input-passwordConfirm" type="password" className="form-control" name="passwordConfirm" value="" />
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

export default Login;
