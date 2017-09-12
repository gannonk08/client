import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Table, Column, Cell } from 'fixed-data-table-2';
import ClientsGridStore from './ClientsGridStore';
import { TextCell } from './ClientsCells';
import Tooltip from 'react-tooltip-component';
import 'fixed-data-table-2/dist/fixed-data-table.min.css';
import './ClientsGrid.css';
import Nav from '../Nav/Nav';
import Header from '../Header/Header';

const SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC',
};

function reverseSortDirection(sortDir) {
  return sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC;
}

class SortHeaderCell extends React.Component {
  constructor(props) {
    super(props);

    this._onSortChange = this._onSortChange.bind(this);
  }

  render() {
    var {onSortChange, sortDir, children, ...props} = this.props;
    return (
      <Cell {...props}>
        <a onClick={this._onSortChange}>
          {children} {sortDir ? (sortDir === SortTypes.DESC ? '↓' : '↑') : ''}
        </a>
      </Cell>
    );
  }

  _onSortChange(e) {
    e.preventDefault();

    if (this.props.onSortChange) {
      this.props.onSortChange(
        this.props.columnKey,
        this.props.sortDir ?
          reverseSortDirection(this.props.sortDir) :
          SortTypes.DESC
      );
    }
  }
}

class DataListWrapper {
  constructor(indexMap, data) {
    this._indexMap = indexMap;
    this._data = data;
  }

  getSize() {
    return this._indexMap.length;
  }

  getObjectAt(index) {
    return this._data.getObjectAt(
      this._indexMap[index],
    );
  }
}

class Grid extends Component {
  constructor(props) {
    super(props);

    this._defaultSortIndexes = [];
    this._dataList = new ClientsGridStore();
    let size = this._dataList.size;
    for (var index = 0; index < size; index++) {
      this._defaultSortIndexes.push(index);
    }

    console.log("data list in CLIENTS grid constructor: ", this._dataList);
    console.log("datalist.getSize(): ", size);

    this.state = {
      scrollToRow: null,
      collapsedRows: new Set(),
      adjustedDataList: this._dataList,
      colSortDirs: {},
      width: '0',
      height: '0'
    }

    this._onSortChange = this._onSortChange.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  _onSortChange(columnKey, sortDir) {
    var sortIndexes = this._defaultSortIndexes.slice();
    sortIndexes.sort((indexA, indexB) => {
      var valueA = this._dataList.getObjectAt(indexA)[columnKey];
      var valueB = this._dataList.getObjectAt(indexB)[columnKey];
      var sortVal = 0;
      if (valueA > valueB) {
        sortVal = 1;
      }
      if (valueA < valueB) {
        sortVal = -1;
      }
      if (sortVal !== 0 && sortDir === SortTypes.ASC) {
        sortVal = sortVal * -1;
      }

      return sortVal;
    });

    this.setState({
      adjustedDataList: new DataListWrapper(sortIndexes, this._dataList),
      colSortDirs: {
        [columnKey]: sortDir,
      },
    });
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
  }

  render() {
    let { adjustedDataList, colSortDirs } = this.state;
    let tableWidth = this.state.width - 10;
    let rowWidth = (tableWidth - 40) / 6;
    let tableHeight = this.state.height * 0.8;
    return (
      <div>
        <Header
          showMenu={true}
        />
        <Nav
          groupByHousehold={true}
        />
        <div id="grid-container">
          <Table
            rowHeight={40}
            rowsCount={adjustedDataList.size}
            groupHeaderHeight={30}
            headerHeight={60}
            width={tableWidth}
            height={tableHeight}
            {...this.props}>
            <Column
              columnKey="id"
              header={
                <Cell>
                  <Tooltip title='Group' position='top'>
                    <div id="group-image-container">
                      <Link to={"/clients"}>
                        <img id="ungroup-image" src={require("./group.png")} alt="ungroup" />
                      </Link>
                    </div>
                  </Tooltip>
                </Cell>
              }
              cell={<TextCell data={adjustedDataList} />}
              fixed={true}
              width={40}
              flexGrow={0}
            />
            <Column
              columnKey="portfolioDescription"
              header={
                <SortHeaderCell
                  onSortChange={this._onSortChange}
                  sortDir={colSortDirs.portfolioDescription}>
                  Portfolio Description
                </SortHeaderCell>
              }
              cell={<TextCell data={adjustedDataList} />}
              fixed={true}
              width={rowWidth}
              flexGrow={1}
            />
            <Column
              columnKey="underlyingPortfolioAccountNumber"
              header={
                <SortHeaderCell
                  onSortChange={this._onSortChange}
                  sortDir={colSortDirs.underlyingPortfolioAccountNumber}>
                  Underlying Portfolio Account Number
                </SortHeaderCell>
              }
              cell={<TextCell data={adjustedDataList} />}
              width={rowWidth}
              flexGrow={1}
            />
            <Column
              columnKey="symbolCUSIP"
              header={
                <SortHeaderCell
                  onSortChange={this._onSortChange}
                  sortDir={colSortDirs.symbolCUSIP}>
                  Symbol/CUSIP
                </SortHeaderCell>
              }
              cell={<TextCell data={adjustedDataList} />}
              width={rowWidth}
              flexGrow={1}
            />
            <Column
              columnKey="currentPrice"
              header={
                <SortHeaderCell
                  onSortChange={this._onSortChange}
                  sortDir={colSortDirs.currentPrice}>
                  Current Price
                </SortHeaderCell>
              }
              cell={<TextCell data={adjustedDataList} />}
              width={rowWidth}
              flexGrow={1}
            />
            <Column
              columnKey="maturityDate"
              header={
                <SortHeaderCell
                  onSortChange={this._onSortChange}
                  sortDir={colSortDirs.maturityDate}>
                  Maturity Date
                </SortHeaderCell>
              }
              cell={<TextCell data={adjustedDataList} />}
              width={rowWidth}
              flexGrow={1}
            />
            <Column
              columnKey="quantity"
              header={
                <SortHeaderCell
                  onSortChange={this._onSortChange}
                  sortDir={colSortDirs.quantity}>
                  Quantity
                </SortHeaderCell>
              }
              cell={<TextCell data={adjustedDataList} />}
              width={rowWidth}
              flexGrow={1}
            />
          </Table>
        </div>
      </div>
    );
  }
}

export default Grid;
