import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Login.css';

const PATH_BASE = 'http://localhost:9000';
const PATH_LOGIN = '/login';

class Login extends Component {
	constructor(props) {
    super(props);
    this.postLogin = this.postLogin.bind(this);
  }

	postLogin() {
		var formData = JSON.stringify({
			username: document.getElementById('username').value,
			password: document.getElementById('password').value
		})
		fetch(PATH_BASE + PATH_LOGIN, {
		  method: "POST",
		  body: formData
		})
		.then(response => response.json()).catch(e => console.log(e));
  }

	render() {
		return (
			<div>
	      <div className="log-in">
					<div className="row">
		        <div id="login-form-container" className="col-md-3 col-sm-4 col-xs-12">
		          <form id="login-form">
		            <div className="username">
		              <label for="username">Username</label>
		              <input id="username" name="username" type="text"/>
		            </div>
		            <div className="pass">
		              <label for="pass">Password</label>
		              <input id="password" name="pass" type="password"/>
		            </div>
		            <div className="buttons">
		              <div className="log-in-button btn btn-success" onClick={this.postLogin}>Log In</div>
		            </div>
								<div>
									<p className="already-member">Not a member?</p>
									<Link to={"/signup"} className="sign-up-button btn btn-primary">Sign Up</Link>
								</div>
		          </form>
		        </div>
						<div className="col-md-9 col-sm-8 col-xs-12">
							<div className="hero-text">
			          <h1>Catchy tagline here...</h1>
			          <p>Find out more here</p>
			        </div>
						</div>
					</div>
	      </div>
				<div className="row about-section">
					<div className="about">
					</div>
					<div className="solution">
					</div>
				</div>
			</div>
		)
	}
}

export default Login;
