import React, {Component} from 'react';
import { Table, Column, Cell } from 'fixed-data-table-2';
import ClientsGridStore from './ClientsGridStore';
import { TextCell } from './ClientsCells';
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
    this._dataList = new ClientsGridStore(1000);

    this._defaultSortIndexes = [];
    let size = this._dataList.getSize();
    for (var index = 0; index < size; index++) {
      this._defaultSortIndexes.push(index);
    }

    this.state = {
      scrollToRow: null,
      collapsedRows: new Set(),
      adjustedDataList: this._dataList,
      colSortDirs: {},
      width: '0',
      height: '0',
      percentageFilterValue: 0
    }

    this._onSortChange = this._onSortChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  _onFilterChange(e, filteredColumn) {
    if (!e.target.value) {
      this.setState({
        adjustedDataList: this._dataList,
      });
    }

    var filterBy = e.target.value.toLowerCase();
    var size = this._dataList.getSize();
    var filteredIndexes = [];
    for (var index = 0; index < size; index++) {
      if (filteredColumn === 'firstName') {
        var {firstName} = this._dataList.getObjectAt(index);
        if (firstName.toLowerCase().indexOf(filterBy) !== -1) {
          filteredIndexes.push(index);
        }
      } else if (filteredColumn === 'catchPhrase') {
        var {catchPhrase} = this._dataList.getObjectAt(index);
        if (catchPhrase.toLowerCase().indexOf(filterBy) !== -1) {
          filteredIndexes.push(index);
        }
      } else if (filteredColumn === 'words') {
        var {words} = this._dataList.getObjectAt(index);
        if (words.toLowerCase().indexOf(filterBy) !== -1) {
          filteredIndexes.push(index);
        }
      } else if (filteredColumn === 'percentage') {
        var {percentage} = this._dataList.getObjectAt(index);
        if (percentage.toLowerCase().indexOf(filterBy) !== -1) {
          filteredIndexes.push(index);
        }
      }
    }
    let updatedPercentageValue = document.getElementById('percentage-filter').value;
    this.setState({
      adjustedDataList: new DataListWrapper(filteredIndexes, this._dataList),
      percentageFilterValue: updatedPercentageValue
    });
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

  componentWillMount() {
    const PATH_GET_IMPORTS = '/clients/dumby';
    let PATH_BASE = '';
    process.env.NODE_ENV === 'production'
    ? PATH_BASE = process.env.REACT_APP_API_PROD
    : PATH_BASE = process.env.REACT_APP_API_DEV;

    fetch(PATH_BASE + PATH_GET_IMPORTS, {
      mode: 'cors',
      credentials: 'include',
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    })
    .then (res => res.json())
    .then(res => {
      if (res.status === "OK") {
        console.log("dumby data: ", res.records);
        let dataArray = res.records;
        this._rowCount = dataArray.length;
      }
    })
    .catch(e => console.log(e));
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
    let {percentageFilterValue, adjustedDataList, colSortDirs} = this.state;
    let { onlyGrid } = this.props;
    let tableWidth = this.state.width - 10;
    let tableHeight = this.state.height * 0.781;
    return (
      <div>
        {
          !onlyGrid
            ? <div><Header showMenu={true}/> <Nav groupByHousehold={false}/></div>
            : null
        }
        <div id="grid-container">
          <div id="grid-filters">
            <input className="grid-filter" id="name-filter" onChange={(e) => this._onFilterChange(e, 'firstName')} placeholder="Filter by Name"
            />
            <input className="grid-filter" id="description-filter" onChange={(e) => this._onFilterChange(e, 'catchPhrase')} placeholder="Filter by Description"
            />
            <input className="grid-filter" id="notes-filter" onChange={(e) => this._onFilterChange(e, 'words')} placeholder="Filter by Notes"
            />
            <div id="percentage-filter-container">
              <div>
                <div id="greater-than">&#62;</div>
                <div id="equal-to">=</div>
                <div id="less-than">&#60;</div>
              </div>
              <div>
                <input className="grid-filter" id="percentage-filter" onChange={(e) => this._onFilterChange(e, 'percentage')} type="range"
                />
                <div id="percentage-label">{percentageFilterValue}&nbsp;%</div>
              </div>
            </div>
          </div>
          <Table
            rowHeight={40}
            rowsCount={adjustedDataList.getSize()}
            groupHeaderHeight={30}
            headerHeight={75}
            width={tableWidth}
            height={tableHeight}
            {...this.props}>
            <Column
              fixed={true}
              width={40}
              flexGrow={0}
            />
            <Column
              columnKey="portfolioDescription"
              header={
                <SortHeaderCell
                  onSortChange={this._onSortChange}
                  sortDir={colSortDirs.firstName}>
                  Portfolio Description
                </SortHeaderCell>
              }
              cell={<TextCell data={adjustedDataList} />}
              fixed={true}
              width={200}
              flexGrow={1}
            />
            <Column
              columnKey="underlyingPortfolioAccountNumber"
              header={
                <SortHeaderCell
                  onSortChange={this._onSortChange}
                  sortDir={colSortDirs.catchPhrase}>
                  Underlying Portfolio Account Number
                </SortHeaderCell>
              }
              cell={<TextCell data={adjustedDataList} />}
              width={300}
              flexGrow={1}
            />
            <Column
              columnKey="symbolCUSIP"
              header={
                <SortHeaderCell
                  onSortChange={this._onSortChange}
                  sortDir={colSortDirs.words}>
                  Symbol/CUSIP
                </SortHeaderCell>
              }
              cell={<TextCell data={adjustedDataList} />}
              width={300}
              flexGrow={1}
            />
            <Column
              columnKey="currentPrice"
              header={
                <SortHeaderCell
                  onSortChange={this._onSortChange}
                  sortDir={colSortDirs.value}>
                  Current Price
                </SortHeaderCell>
              }
              cell={<TextCell data={adjustedDataList} />}
              width={200}
              flexGrow={1}
            />
            <Column
              columnKey="maturityDate"
              header={
                <SortHeaderCell
                  onSortChange={this._onSortChange}
                  sortDir={colSortDirs.percentage}>
                  Maturity Date
                </SortHeaderCell>
              }
              cell={<TextCell data={adjustedDataList} />}
              width={200}
              flexGrow={1}
            />
            <Column
              columnKey="quantity"
              header={
                <SortHeaderCell
                  onSortChange={this._onSortChange}
                  sortDir={colSortDirs.percentage}>
                  Quantity
                </SortHeaderCell>
              }
              cell={<TextCell data={adjustedDataList} />}
              width={200}
              flexGrow={1}
            />
          </Table>
        </div>
      </div>
    );
  }
}

export default Grid;
