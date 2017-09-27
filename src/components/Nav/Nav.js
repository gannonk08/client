import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import SMO from '../SMO/SMO';
import Imports from '../Imports/Imports';
import './Nav.css';
import Tooltip from 'react-tooltip-component';
import {CSVLink} from 'react-csv';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.showRebalanceBanner = this.showRebalanceBanner.bind(this);
    this.showImports = this.showImports.bind(this);
    this.handleHouseholds = this.handleHouseholds.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);

    this.state = {
      rebalanceToolsVisible: false,
      importsVisible: this.props.importsVisible,
      rebalanceImageSrc: 'rebalance.png',
      csvData: this.props.csvData
    };
  }

  showRebalanceBanner() {
    let { importsVisible, rebalanceToolsVisible } = this.state;
    if (importsVisible) {
      this.setState({ importsVisible: false });
    }
    this.setState({ rebalanceToolsVisible: !rebalanceToolsVisible });
  }

  showImports() {
    let { importsVisible, rebalanceToolsVisible } = this.state;
    if (rebalanceToolsVisible) {
      this.setState({ rebalanceToolsVisible: false });
    }
    this.setState({ importsVisible: !importsVisible });
  }

  handleHouseholds() {
    let { importsVisible, rebalanceToolsVisible } = this.state;
    if (rebalanceToolsVisible) {
      this.setState({ rebalanceToolsVisible: false });
    }
    if (importsVisible) {
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
    let {csvData, importsVisible, rebalanceToolsVisible, rebalanceImageSrc} = this.state;
		return (
      <div>
        <nav>
          <div className="nav-left">
            <div id="clientsNav" className={true}>
              <Tooltip title='Clients' position='top'>
                <img className="nav-image" onClick={this.handleHouseholds} src={require("./images/clients.png")} alt="clients" />
              </Tooltip>
            </div>
            <div id="importsNav" className={importsVisible}>
              <Tooltip title='Import CSV' position='top'>
                <img className="nav-image" onClick={this.showImports}  src={require("./images/imports.png")} alt="imports" />
              </Tooltip>
            </div>
            <div id="rebalanceNav" className={rebalanceToolsVisible} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
              <Tooltip title='Rebalance Accounts' position='top'>
                <img className="nav-image" onClick={this.showRebalanceBanner} src={require('./images/' + rebalanceImageSrc)} alt="rebalance"/>
              </Tooltip>
            </div>
            <div id="exportCsv" className="false">
              <CSVLink data={csvData} id="csv-link"
                filename={"sampleCSV.csv"}
                target="_blank">
                <Tooltip title='Export to CSV' position='top'>
                  <img className="nav-image" src={require("./images/download-csv.png")} alt="csv" />
                </Tooltip>
              </CSVLink>
            </div>
          </div>
          <div className="nav-right"></div>
        </nav>
        <div id="importsVisible" className={importsVisible}>
          <Imports />
        </div>
        <div id="rebalanceToolsVisible" className={rebalanceToolsVisible}>
          <SMO />
        </div>
      </div>
		)
	}
}

export default withRouter(Nav);
