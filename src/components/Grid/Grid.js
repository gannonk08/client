import React, {Component} from 'react';
import './Grid.css';

import Nav from '../Nav/Nav';
import Header from '../Header/Header';
import HouseholdsGrid from '../HouseholdsGrid/HouseholdsGrid';

class Grid extends Component {
  constructor(props) {
		super(props);
	}

  render() {
    return (
      <div>
        <Header
          showMenu={true}
        />
        <Nav
          groupByHousehold={true}
        />
        <div id="grid-container">
          <HouseholdsGrid />
        </div>
      </div>
    );
  }
}

export default Grid;
