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
    // let sessionIndicator = localStorage.getItem("activeSession");
	}

  render() {
    let cachedEmail = this.props.emails[this.props.emails.length-1];
    let sessionIndicator;
    cachedEmail === "useremail@domain.com"
    ? sessionIndicator = false
    : sessionIndicator = true;
    console.log('cached email: ', cachedEmail);
    console.log('activeSession? : ', sessionIndicator);

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
