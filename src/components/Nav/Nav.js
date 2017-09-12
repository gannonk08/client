import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import SMO from '../SMO/SMO';
import Imports from '../Imports/Imports';
import './Nav.css';
import Tooltip from 'react-tooltip-component';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.showRebalanceBanner = this.showRebalanceBanner.bind(this);
    this.showImports = this.showImports.bind(this);
    this.handleClients = this.handleClients.bind(this);
    this.handleHouseholds = this.handleHouseholds.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
    this.state = {
      rebalanceToolsVisible: false,
      importsVisible: false,
      rebalanceImageSrc: 'rebalance.png'
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

  handleClients() {
    if (this.state.rebalanceToolsVisible) {
      this.setState({ rebalanceToolsVisible: false });
    }
    if (this.state.importsVisible) {
      this.setState({ importsVisible: false });
    }
    this.props.history.push('/accounts');
  }

  handleHouseholds() {
    if (this.state.rebalanceToolsVisible) {
      this.setState({ rebalanceToolsVisible: false });
    }
    if (this.state.importsVisible) {
      this.setState({ importsVisible: false });
    }
    this.props.history.push('/clients');
  }

  mouseEnter() {
    this.setState({ rebalanceImageSrc: 'rebalance-flipped.png'});
  }

  mouseLeave() {
    this.setState({ rebalanceImageSrc: 'rebalance.png'});
  }

	render() {
		return (
      <div>
        <nav>
          <div className="nav-left">
            <div id="clientsNav" className={true}>
              <Tooltip title='Clients' position='top'>
                <img className="nav-image" onClick={this.handleClients} src={require("./images/clients.png")} alt="clients" />
              </Tooltip>
            </div>
            <div id="importsNav" className={this.state.importsVisible}>
              <Tooltip title='Import CSV' position='top'>
                <img className="nav-image" onClick={this.showImports}  src={require("./images/imports.png")} alt="imports" />
              </Tooltip>
            </div>
            <div id="rebalanceNav" className={this.state.rebalanceToolsVisible} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
              <Tooltip title='Rebalance Accounts' position='top'>
                <img className="nav-image" onClick={this.showRebalanceBanner} src={require('./images/' + this.state.rebalanceImageSrc)} alt="rebalance"/>
              </Tooltip>
            </div>
            <div id="exportCsv" className="false">
              <Tooltip title='Export to CSV' position='top'>
                <img className="nav-image" src={require("./images/download-csv.png")} alt="csv" />
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
