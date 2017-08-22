import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import './Nav.css';

const PATH_BASE = "https://bondladderpro-v1.herokuapp.com";
const PATH_SIGNOUT = '/signout';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.toggleNav = this.toggleNav.bind(this);
    this.getLogout = this.getLogout.bind(this);
    this.state = {
      active: false,
    };
  }

  toggleNav() {
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
			console.log(res);
			if (res.status === "OK") {
				this.props.history.push('/');
			}
		})
		.catch(e => console.log(e));
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
            <div onClick={this.toggleNav} className={this.props.rebalance}>
              <Link to={"/rebalance"} className={this.props.rebalance}>Rebalance</Link>
            </div>
          </div>
          <div className="col-lg-8 col-md-8 col-sm-4 col-xs-0">
            <div className="header-space"></div>
          </div>
          <div className="col-lg-1 col-md-1 col-sm-2 col-xs-3">
            <div onClick={this.toggleNav} id="log-out-div">
              <div id="log-out" onClick={this.getLogout}>Log Out</div>
            </div>
          </div>
        </nav>
      </div>
		)
	}
}

export default withRouter(Nav);
