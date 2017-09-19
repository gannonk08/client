import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connector} from '../../redux/userStore';
import './Grid.css';

import Nav from '../Nav/Nav';
import Header from '../Header/Header';
import HouseholdsGrid from '../HouseholdsGrid/HouseholdsGrid';
import HouseholdsGridStore from '../HouseholdsGrid/HouseholdsGridStore';

class Grid extends Component {
  constructor(props) {
		super(props);

    this.dataStore = new HouseholdsGridStore();
    this.csvData = this.dataStore._cache;
	}

  render() {
    let sessionIndicator;
    let storageSessionIndicator = localStorage.getItem("activeSession");
    if (storageSessionIndicator === 'true') {
      sessionIndicator = true;
    } else {
      sessionIndicator = false;
    }
    console.log('activeSession? : ', sessionIndicator);
    console.log('storageSessionIndicator? : ', storageSessionIndicator);

    return (
      <div>
        <Header
          showMenu={true}
        />
        <Nav
          groupByHousehold={true}
          csvData={this.csvData}
        />
        <div id="grid-container">
          {
            sessionIndicator
              ? <HouseholdsGrid />
              :
              <div>
                <p id="redirect-login-paragraph"><Link to={"/"} id="redirect-login">You must be logged in to view this page. Click here to log in.</Link></p>
              </div>

          }
        </div>
      </div>
    );
  }
}

export default connector(Grid);
