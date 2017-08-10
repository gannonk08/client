import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class Imports extends Component {
	render() {
		return (
      <div>
        <header>
          <Link to={"/"}>
            <h1>BondLadderPro</h1>
          </Link>
          <div className="header-links">
            <Link to={"/"}>ABOUT &nbsp;&nbsp; |</Link>
            <Link to={"/"}>CONTACT &nbsp;&nbsp; |</Link>
            <Link to={"/"}>&nbsp;&nbsp;LOG IN</Link>
          </div>
        </header>
        <nav>
          <div>
            <Link id="log-in-link" to={"/"}>Log In</Link>
          </div>
          <div>
            <Link to={"/imports"}>Imports</Link>
          </div>
          <div>
            <Link to={"/clients"}>Clients</Link>
          </div>
          <div>
            <Link to={"/rebalance"}>Rebalance</Link>
          </div>
          <div className="header-space"></div>
        </nav>
      </div>
		)
	}
}

export default Imports;
