import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import './Nav.css';
import RebalanceFormTrigger from '../Rebalance/RebalanceFormTrigger';
import ImportsFormTrigger from '../Imports/ImportsFormTrigger';
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
    if (this.state.importsVisible) {
      this.setState({ importsVisible: false });
    }
    this.props.history.push('/clients');
  }

	render() {
    let {csvData, importsVisible} = this.state;
    let { activeTab } = this.props;
    let csvHeaders = ["name", "model", "balance", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030", "2031", "2032", "2033", "2034", "2035", "2036", "2037", "2038", "2039", "2040", "2041", "2042", "2043", "2044", "2045", "2046"];
		return (
      <nav>
        <div className="nav-left">
          <div id="clientsNav" className={true}>
            <Tooltip title='Clients' position='top'>
              <img className="nav-image" onClick={this.handleHouseholds} src={require("./images/clients.png")} alt="clients" />
            </Tooltip>
          </div>
          <ImportsFormTrigger activeTab={activeTab} importsVisible={importsVisible} />
          <RebalanceFormTrigger activeTab={activeTab} />
          <div id="exportCsv" className="false">
            <CSVLink headers={csvHeaders} data={csvData} id="csv-link"
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
		)
	}
}

export default withRouter(Nav);
