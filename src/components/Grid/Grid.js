import React, {Component} from 'react';
import './Grid.css';

import Nav from '../Nav/Nav';
import Header from '../Header/Header';
import ClientsGrid from '../ClientsGrid/ClientsGrid';
import HouseholdsGrid from '../HouseholdsGrid/HouseholdsGrid';

class Grid extends Component {
  constructor(props) {
		super(props);
		this.groupData = this.groupData.bind(this);

    this.state = { grouped: true }
	}

  groupData(e) {
    e.preventDefault();
    this.setState({ grouped: !this.state.grouped });
  }

  render() {
    let { grouped } = this.state;
    return (
      <div>
        <Header
          showMenu={true}
        />
        <Nav
          groupByHousehold={true}
        />
        <div id="grid-container">
          <div id="toggle-grouping">
            <label htmlFor="toggleGroup">Group by: </label>
            <button type="button" name="toggleGroup" onClick={(e) => {this.groupData(e)}}>
              {
                grouped
                  ? <img id="households-image" src={require("./images/client.png")} alt="client" />
                  : <img id="households-image" src={require("./images/household.png")} alt="household" />
              }
            </button>
          </div>
          {
            grouped
              ? <HouseholdsGrid />
              : <ClientsGrid />
          }
        </div>
      </div>
    );
  }
}

export default Grid;
