import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import './Login.css';
import Header from '../Header/Header';

const PATH_BASE = "https://bondladderpro-v1.herokuapp.com";
const PATH_SIGNIN = '/signin';

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

		console.log(formData);
		fetch(PATH_BASE + PATH_SIGNIN, {
			mode: 'cors',
		  method: 'POST',
			headers: {
				'Access-Control-Allow-Origin': '*',
		    'Accept': '*/*',
		    'Content-Type': 'application/json'
		  },
		  body: formData
		})
		.then(response => response.json())
		.then(res => {
			console.log(res);
			if (res.status === "OK") {
				this.props.history.push('/clients');
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
	      <div className="log-in">
					<div className="row">
		        <div id="login-form-container" className="col-md-3 col-sm-4 col-xs-12">
		          <form id="login-form">
		            <div className="email">
		              <label for="email">Email</label>
		              <input id="email" className="form-control" name="email" type="text"/>
		            </div>
		            <div className="pass">
		              <label for="pass">Password</label>
		              <input id="password" className="form-control" name="pass" type="password"/>
		            </div>
		            <div className="buttons">
		              <div className="log-in-button btn btn-success" onClick={this.postLogin}>Log In</div>
		            </div>
								<div>
									<p className="already-member">Not a member?</p>
									<Link to={"/signup"} className="sign-up-button">Sign Up</Link>
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

export default withRouter(Login);
