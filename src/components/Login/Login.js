import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Login extends Component {
	render() {
		return (
      <div className="log-in">
        <div className="login-form-container">
          <form>
            <div className="username">
              <label for="username">Username</label>
              <input name="username" type="text"/>
            </div>
            <div className="pass">
              <label for="pass">Password</label>
              <input name="pass" type="text"/>
            </div>
            <div className="buttons">
              <button className="log-in-button" type="submit"><Link to={"/imports"}>Log In</Link></button>
              <button className="sign-up-button" type="submit">Sign Up</button>
            </div>
          </form>
        </div>
        <div className="hero-text">
          <h1>Catchy tagline here...</h1>
          <p>Find out more here</p>
        </div>
      </div>
		)
	}
}

export default Login;
