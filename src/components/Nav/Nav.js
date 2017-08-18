import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Nav.css';

class Nav extends Component {
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
    const { imports, clients, rebalance } = this.props;
		return (
      <div>
        <nav>
          <div className="col-lg-1 col-md-1 col-sm-2 col-xs-3">
            <div onClick={this.toggleNav} className={this.props.imports}>
              <Link to={"/imports"} className={this.props.imports}>Imports</Link>
            </div>
          </div>
          <div className="col-lg-1 col-md-1 col-sm-2 col-xs-3">
            <div onClick={this.toggleNav} className={this.props.clients}>
              <Link to={"/clients"} className={this.props.clients}>Clients</Link>
            </div>
          </div>
          <div className="col-lg-1 col-md-1 col-sm-2 col-xs-3">
            <div onClick={this.toggleNav}>
              <Link to={"/rebalance"} className={this.props.rebalance}>Rebalance</Link>
            </div>
          </div>
          <div className="col-lg-8 col-md-8 col-sm-4 col-xs-0">
            <div className="header-space"></div>
          </div>
          <div className="col-lg-1 col-md-1 col-sm-2 col-xs-3">
            <div onClick={this.toggleNav} id="log-out-div">
              <Link to={"/"} id="log-out">Log Out</Link>
            </div>
          </div>
        </nav>
      </div>
		)
	}
}

export default Nav;
