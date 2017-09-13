import React, {Component} from 'react';
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
          <HouseholdsGrid />
        </div>
      </div>
    );
  }
}

export default Grid;
