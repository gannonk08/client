import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Imports from '../Imports/Imports';
import './Nav.css';
import {Modal} from 'react-bootstrap';
import RebalanceFormTrigger from '../Rebalance/RebalanceFormTrigger';
import Tooltip from 'react-tooltip-component';
import {CSVLink} from 'react-csv';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.showImports = this.showImports.bind(this);
    this.handleHouseholds = this.handleHouseholds.bind(this);

    this.state = {
      importsVisible: this.props.importsVisible,
      csvData: this.props.csvData
    };
  }

  showImports() {
    this.setState({ importsVisible: !this.state.importsVisible });
  }

  handleHouseholds() {
    let { importsVisible } = this.state;
    if (importsVisible) {
      this.setState({ importsVisible: false });
    }
    this.props.history.push('/clients');
  }

	render() {
    let {csvData, importsVisible} = this.state;
    let { activeTab } = this.props;
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
            <RebalanceFormTrigger activeTab={activeTab}/>
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
      </div>
		)
	}
}

export default withRouter(Nav);
