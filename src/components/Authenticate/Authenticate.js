import React, {Component} from 'react';
import {connector} from '../../redux/userStore';
import './Authenticate.css';
import Header from '../Header/Header';
import Hero from '../Hero/Hero';
import Signin from '../Signin/Signin';
import Signup from '../Signup/Signup';

class Authenticate extends Component {
	constructor(props) {
    super(props);
    this.toggleAuthComponent = this.toggleAuthComponent.bind(this);
    this.state = {
      isSigninVisible: true
    };
  }

	toggleAuthComponent() {
		this.setState({ isSigninVisible: !this.state.isSigninVisible })
	}

	render() {
		return (
			<div>
				<Header
					showMenu={false}
				/>
	      <div className="log-in">
					<div className="row">
						<div id="auth-form-container">
							<form id="auth-form">
								{
									this.state.isSigninVisible
										? <Signin />
										: <Signup />
								}
								<div id="not-member" className={this.state.isSigninVisible}>
									<p className="already-member">Not a member?</p>
									<p className="sign-up-button" onClick={this.toggleAuthComponent}>Sign Up</p>
								</div>
								<div id="already-member" className={this.state.isSigninVisible}>
									<p className="already-member">Already a member?</p>
									<p className="sign-up-button" onClick={this.toggleAuthComponent}>Log In</p>
								</div>
							</form>
						</div>
						<Hero />
					</div>
	      </div>
			</div>
		)
	}
}

export default connector(Authenticate);
