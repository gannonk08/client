import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connector} from '../../redux/userStore';

const PATH_BASE = "https://bondladderpro-v1.herokuapp.com";
const PATH_SIGNIN = '/signin';

class Signin extends Component {
	constructor(props) {
    super(props);
    this.postSignin = this.postSignin.bind(this);
  }

	postSignin() {
		let formData = JSON.stringify({
			email: document.getElementById('email').value,
			password: document.getElementById('password').value
		})

		fetch(PATH_BASE + PATH_SIGNIN, {
			mode: 'cors',
			credentials: 'include',
		  method: 'POST',
			headers: {
				'Access-Control-Allow-Origin': '*',
		    'Accept': '*/*',
		    'Content-Type': 'application/json',
				'DNT': 0
		  },
		  body: formData
		})
		.then(response => response.json())
		.then(res => {
			if (res.status === "OK") {
				this.props.history.push('/clients');
				this.props.addUserEmail(res.record.email);
			}
		})
		.catch(e => console.log(e));
  }

	render() {
		return (
			<div>
				<div className="email">
					<label htmlFor="email">Email</label>
					<input id="email" className="form-control" name="email" type="text"/>
				</div>
				<div className="pass">
					<label htmlFor="pass">Password</label>
					<input id="password" className="form-control" name="pass" type="password"/>
				</div>
				<div className="buttons">
					<div className="log-in-button btn btn-success" onClick={this.postSignin}>Log In</div>
				</div>
			</div>
		)
	}
}

export default withRouter(connector(Signin));
