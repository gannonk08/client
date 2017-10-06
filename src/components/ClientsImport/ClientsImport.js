import React, {Component} from 'react';
import {connector} from '../../redux/store';
import {Table, Column, Cell} from 'fixed-data-table-2';
import Loader from 'react-loader';
import './ClientsImport.css';

import Nav from '../Nav/Nav';
import Header from '../Header/Header';
import Grid from '../Grid/Grid';

class ClientsImport extends Component {
  constructor(props) {
		super(props);
    this.state = { loaded: false, data: {}, };
	}

  componentDidMount() {
    this.setState({ loaded: true });
  }

  render() {
    let { loaded } = this.state;
    let { uploadIdExists } = this.props;
    let tableWidth = window.innerWidth - 10;
    let aboutWidth = (window.innerWidth - 95) / 8;
    let longWidth = tableWidth - aboutWidth - 65;

    return (
      <Loader loaded={loaded}>
        <div>
          {
            uploadIdExists
              ? <Grid />
              :
              <div>
                <Header
                  showMenu={true}
                />
                <Nav
                  groupByHousehold={true}
                  importsVisible={true}
                  csvData={'import data to populate this csv'}
                />
                <div id="grid-container">
                  <Table
                    rowHeight={40}
                    rowsCount={0}
                    headerHeight={40}
                    width={tableWidth}
                    height={40}
                    {...this.props}>
                    <Column
                      header={<Cell></Cell>}
                      width={40}
                    />
                    <Column
                      header={<Cell>Details</Cell>}
                      width={aboutWidth}
                    />
                    <Column
                      header={<Cell>Bond Ladder</Cell>}
                      width={longWidth}
                    />
                  </Table>
                </div>
              </div>

          }
        </div>
      </Loader>
    );
  }
}

export default ClientsImport;
