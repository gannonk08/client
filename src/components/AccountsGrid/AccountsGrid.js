import React, {Component} from 'react';
import {Table, Column, Cell} from 'fixed-data-table-2';
import {TextCell} from './GridCells/HelperCells';
import 'fixed-data-table-2/dist/fixed-data-table.min.css';
import './AccountsGrid.css';

const SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC',
};

class AccountsGrid extends Component {
  constructor(props) {
    super(props);
    console.log("Rebalance Accounts props in constructor", this.props.freshData);

    this._dataList = this.props.freshData;

    this._defaultSortIndexes = [];
    let size = this._dataList.size;
    for (let index = 0; index < size; index++) {
      this._defaultSortIndexes.push(index);
    };

    this.state = {
      adjustedDataList: this._dataList,
      dataListSize: this._dataList.size,
    }

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
    this.setState({ tableWidth: window.innerWidth - 10 });
    this.setState({ colWidth: (window.innerWidth - 95) / 5 });
  }

  render() {
    let {adjustedDataList, dataListSize, colWidth, tableWidth, height} = this.state;

    let rowWidth = (tableWidth - 60) / 6;
    let tableHeight = (height * 0.79) - 45;

    return (
      <div>
        <div id="grid-container">
          <Table
            rowHeight={40}
            rowsCount={dataListSize}
            headerHeight={40}
            width={tableWidth}
            height={tableHeight}
            >
            <Column
              columnKey="id"
              header={<Cell>Priority</Cell>}
              cell={<TextCell data={adjustedDataList} />}
              width={colWidth}
              flexGrow={1}
            />
            <Column
              columnKey="type"
              header={<Cell>Type</Cell>}
              cell={<TextCell data={adjustedDataList} />}
              width={colWidth}
              flexGrow={1}
            />
            <Column
              columnKey="accountNumber"
              header={<Cell>Account Number</Cell>}
              cell={<TextCell data={adjustedDataList} />}
              width={colWidth}
              flexGrow={1}
            />
            <Column
              columnKey="total"
              header={<Cell>Total</Cell>}
              cell={<TextCell data={adjustedDataList} />}
              width={colWidth}
              flexGrow={1}
            />
            <Column
              columnKey="year"
              header={<Cell>Year</Cell>}
              cell={<TextCell data={adjustedDataList} />}
              width={colWidth}
              flexGrow={1}
            />
          </Table>
        </div>
      </div>
    );
  }
}

export default AccountsGrid;
