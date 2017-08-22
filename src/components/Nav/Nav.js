import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import SMO from '../SMO/SMO';
import Imports from '../Imports/Imports';
import './Nav.css';
import Tooltip from 'react-tooltip-component';

const PATH_BASE = "https://bondladderpro-v1.herokuapp.com";
const PATH_SIGNOUT = '/signout';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.showRebalanceBanner = this.showRebalanceBanner.bind(this);
    this.showImports = this.showImports.bind(this);
    this.state = {
      rebalanceToolsVisible: false,
      importsVisible: false
    };
  }

  showRebalanceBanner() {
    if (this.state.importsVisible) {
      this.setState({ importsVisible: false });
    }
    this.setState({ rebalanceToolsVisible: !this.state.rebalanceToolsVisible });
  }

  showImports() {
    if (this.state.rebalanceToolsVisible) {
      this.setState({ rebalanceToolsVisible: false });
    }
    this.setState({ importsVisible: !this.state.importsVisible });
  }

	render() {
		return (
      <div>
        <nav>
          <div className="nav-left">
            <div className="clients-label">
              <Tooltip title='Clients' position='top'>
                <img className="nav-image" src={require("./clients.png")} alt="clients" />
              </Tooltip>
            </div>
            <div id="importsNav" className={this.state.importsVisible}>
              <Tooltip title='Import CSV' position='top'>
                <img className="nav-image" onClick={this.showImports}  src={require("./imports.png")} alt="imports" />
              </Tooltip>
            </div>
            <div id="rebalanceNav" className={this.state.rebalanceToolsVisible}>
              <Tooltip title='Rebalance Accounts' position='top'>
                <img className="nav-image" onClick={this.showRebalanceBanner} src={require("./rebalance.png")} alt="rebalance" />
              </Tooltip>
            </div>
            <div id="exportCsv" className="false">
              <Tooltip title='Export to CSV' position='top'>
                <img className="nav-image" src={require("./download-csv.png")} alt="csv" />
              </Tooltip>
            </div>
          </div>
          <div className="nav-right"></div>
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
