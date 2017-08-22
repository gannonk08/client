import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import SMO from '../SMO/SMO';
import Imports from '../Imports/Imports';
import './Nav.css';

const PATH_BASE = "https://bondladderpro-v1.herokuapp.com";
const PATH_SIGNOUT = '/signout';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.getLogout = this.getLogout.bind(this);
    this.showRebalanceBanner = this.showRebalanceBanner.bind(this);
    this.showImports = this.showImports.bind(this);
    this.state = {
      rebalanceToolsVisible: false,
      importsVisible: false
    };
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

  showRebalanceBanner() {
    this.setState({ rebalanceToolsVisible: !this.state.rebalanceToolsVisible });
  }

  showImports() {
    this.setState({ importsVisible: !this.state.importsVisible });
  }

	render() {
		return (
      <div>
        <nav>
          <div className="nav-left">
            <div className="clients-label">
              <img className="nav-image" src={require("./clients.png")} alt="clients" />
            </div>
            <div className={this.state.importsVisible}>
              <img className="nav-image" onClick={this.showImports}  src={require("./imports.png")} alt="imports" />
            </div>
            <div className={this.state.rebalanceToolsVisible}>
              <img className="nav-image" onClick={this.showRebalanceBanner} src={require("./rebalance.png")} alt="rebalance" />
            </div>
            <div className="date-today">22-Aug-2017</div>
          </div>
          <div className="nav-right">
            <div id="log-out-div">
              <div id="log-out" onClick={this.getLogout}>Log Out</div>
            </div>
          </div>
        </nav>
        {
          this.state.importsVisible
            ? <Imports />
            : null
        }
        {
          this.state.rebalanceToolsVisible
            ? <SMO />
            : null
        }
      </div>
		)
	}
}

export default withRouter(Nav);
