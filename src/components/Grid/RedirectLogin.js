import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class RedirectLogin extends Component {
  render() {
    return (
      <div>
        <p id="redirect-login-paragraph"><Link to={"/"} id="redirect-login">You must be logged in to view this page. Click here to log in.</Link></p>
      </div>
    );
  }
}
