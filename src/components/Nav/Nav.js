import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Imports extends Component {
  constructor(props) {
    super(props);
    this.toggleNav = this.toggleNav.bind(this);
    this.state = {
      active: false,
    };
  }

  toggleNav() {
    console.log('clicked');
    // console.log(e.currentTarget.classList.contains("active-tab"));
    // if (e.currentTarget.classList.contains("active-tab")) {
    //   let currentState = true;
    //   this.setState({ active: currentState });
    //   console.log(this.state.active);
    // } else {
    //   let currentState = this.state.active;
    //   this.setState({ active: !currentState });
    //   console.log(this.state.active);
    // }
  }

	render() {
		return (
      <div>
        <header>
          <Link to={"/"}>
            <h1>BondLadderPro</h1>
          </Link>
          <div className="header-links">
            <Link to={"/about"}>ABOUT &nbsp;&nbsp; |</Link>
            <Link to={"/contact"}>CONTACT &nbsp;&nbsp; |</Link>
            <Link to={"/"}>&nbsp;&nbsp;LOG IN</Link>
          </div>
        </header>
        <nav>
          <div onClick={this.toggleNav} className="active-tab">
            <Link className="active-tab-link" to={"/"}>Log In</Link>
          </div>
          <div onClick={this.toggleNav}>
            <Link to={"/imports"}>Imports</Link>
          </div>
          <div onClick={this.toggleNav}>
            <Link to={"/clients"}>Clients</Link>
          </div>
          <div onClick={this.toggleNav}>
            <Link to={"/rebalance"}>Rebalance</Link>
          </div>
          <div className="header-space"></div>
        </nav>
      </div>
		)
	}
}

export default Imports;
