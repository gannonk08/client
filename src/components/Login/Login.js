import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Login.css';

const PATH_BASE = 'http://localhost:9000';
const PATH_SIGNIN = '/signin';
const PATH_LOGIN = '/signin';

class Login extends Component {
	constructor(props) {
    super(props);
    this.postLogin = this.postLogin.bind(this);
  }

	postLogin() {
		var formData = JSON.stringify({
			email: document.getElementById('email').value,
			password: document.getElementById('password').value
		})
		fetch(PATH_BASE + PATH_SIGNIN, {
		  method: "POST",
			headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/x-www-form-urlencoded'
		  },
		  body: formData
		})
		.then(response => response.json())
		.then(res => {
			console.log(res);
		})
		.catch(e => console.log(e));
  }

	render() {
		return (
			<div>
	      <div className="log-in">
					<div className="row">
		        <div id="login-form-container" className="col-md-3 col-sm-4 col-xs-12">
		          <form id="login-form">
		            <div className="email">
		              <label for="email">Email</label>
		              <input id="email" name="email" type="text"/>
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
			          <h1>Bond Ladder Automation made easy</h1>
			          <p><Link to={"/about"} id="about-link">Find out more here</Link></p>
			        </div>
						</div>
					</div>
	      </div>
			</div>
		)
	}
}

export default Login;
