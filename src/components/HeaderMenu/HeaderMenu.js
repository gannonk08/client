import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import './HeaderMenu.css';

const PATH_BASE = "https://bondladderpro-v1.herokuapp.com";
const PATH_SIGNOUT = '/signout';

class HeaderMenu extends Component {
	constructor(props) {
    super(props);
    this.getLogout = this.getLogout.bind(this);
  }

	getLogout() {
		fetch(PATH_BASE + PATH_SIGNOUT, {
			mode: 'cors',
		  method: 'GET',
			headers: {
				'Access-Control-Allow-Origin': '*',
		    'Accept': '*/*',
		    'Content-Type': 'application/json'
		  }
		})
		.then(response => response.json())
		.then(res => {
			if (res.status === "OK") {
				this.props.history.push('/');
			}
		})
		.catch(e => console.log(e));
  }

	render() {
		return (
      <div id="header-menu">
        <div>
					<div id="log-out-div">
						<div id="log-out" onClick={this.getLogout}>Log Out</div>
					</div>
				</div>
      </div>
		)
	}
}

export default withRouter(HeaderMenu);
