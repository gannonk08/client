import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connector} from '../../redux/userStore';
import Loader from 'react-loader';

let PATH_BASE = '';
process.env.NODE_ENV === 'production'
? PATH_BASE = process.env.REACT_APP_API_PROD
: PATH_BASE = process.env.REACT_APP_API_DEV;

const PATH_SIGNIN = '/signin';

class Signin extends Component {
	constructor(props) {
    super(props);
    this.postSignin = this.postSignin.bind(this);

		this.state = { loaded: true };
  }

	postSignin() {
		this.setState({ loaded: false });
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
		    'Content-Type': 'application/json'
		  },
		  body: formData
		})
		.then(response => response.json())
		.then(res => {
			if (res.status === "OK") {
				localStorage.setItem('activeSession', true);
				localStorage.setItem('user', res.record.email);
				localStorage.setItem('uuid', res.record.UUID);
				this.setState({ loaded: true });
				this.props.history.push('/clients');
				this.props.addUserEmail(res.record.email);
			}
		})
		.catch(e => {
			console.log(e);
			this.setState({ loaded: true });
		});
  }

	render() {
		let { loaded } = this.state;
		return (
			<Loader loaded={loaded}>
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
						<div className="log-in-button btn btn-primary" onClick={this.postSignin}>Log In</div>
					</div>
				</div>
			</Loader>
		)
	}
}

export default withRouter(connector(Signin));
