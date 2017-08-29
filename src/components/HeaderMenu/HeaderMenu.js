import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import './HeaderMenu.css';
import ChangePassword from '../ChangePassword/ChangePassword';

const PATH_BASE = "https://bondladderpro-v1.herokuapp.com";
const PATH_SIGNOUT = '/signout';

class HeaderMenu extends Component {
	constructor(props) {
    super(props);
    this.getLogout = this.getLogout.bind(this);
    this.toggleChangeForm = this.toggleChangeForm.bind(this);
		this.state = {
      changeFormVisible: false
    };
  }

	getLogout() {
		let bondladderproAuth = process.env.BONDLADDERPRO_AUTH;
		fetch(PATH_BASE + PATH_SIGNOUT, {
			mode: 'cors',
			credentials: 'include',
		  method: 'GET',
			headers: {
				'Access-Control-Allow-Origin': '*',
		    'Accept': '*/*',
		    'Content-Type': 'application/json'
		  }
		})
		.then(res => {
			if (res.ok) {
				this.props.history.push('/');
			}
		})
		.catch(e => console.log(e));
  }

	toggleChangeForm() {
		this.setState({ changeFormVisible: !this.state.changeFormVisible });
	}

	render() {
		return (
      <div id="header-menu">
				<div id="log-out" onClick={this.getLogout}>Log Out</div>
				<div id="change-password" onClick={this.toggleChangeForm}>Change Password</div>
				{
          this.state.changeFormVisible
            ? <ChangePassword />
            : null
        }
				<div className={this.state.changeFormVisible}>
					<div className="row" id="cancelChange">
						<div className="btn btn-danger" onClick={this.toggleChangeForm}>Cancel</div>
					</div>
				</div>
      </div>
		)
	}
}

export default withRouter(HeaderMenu);
