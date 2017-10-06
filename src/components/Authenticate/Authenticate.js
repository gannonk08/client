import React, {Component} from 'react';
import {connector} from '../../redux/store';
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
		let { isSigninVisible } = this.state;
		return (
			<div>
				<Header
					showMenu={false}
				/>
	      <div className="log-in">
					<div className="row">
						<div id="auth-form-container">
							<div id="auth-form">
								{
									isSigninVisible
										? <Signin />
										: <Signup />
								}
								<div id="not-member" className={isSigninVisible}>
									<p className="already-member">Not a member?</p>
									<p className="sign-up-button" onClick={this.toggleAuthComponent}>Sign Up</p>
								</div>
								<div id="already-member" className={isSigninVisible}>
									<p className="already-member">Already a member?</p>
									<p className="sign-up-button" onClick={this.toggleAuthComponent}>Log In</p>
								</div>
							</div>
						</div>
						<Hero />
					</div>
	      </div>
			</div>
		)
	}
}

export default Authenticate;
