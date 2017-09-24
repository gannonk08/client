import React, {Component} from 'react';
import {Table, Column, Cell} from 'fixed-data-table-2';
import {ExpandAllRows, CollapseAllRows} from './GridCells/ExpandCollapseAllRows';
import {HideFilters, ShowFilters} from './GridCells/ToggleFilters';
import {DataListWrapper} from './GridCells/DataListWrapper';
import {CollapseCell, TextCell, SortHeaderCell} from './GridCells/HelperCells';
import AccountsGridStore from './AccountsGridStore';
import SecuritiesGridStore from './SecuritiesGridStore';
import 'fixed-data-table-2/dist/fixed-data-table.min.css';
import './HouseholdsGrid.css';

import Tooltip from 'react-tooltip-component';

const SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC',
};

// variables and functions starting with '_' are used by 'fixed-data-table-2' library
class HouseholdsGrid extends Component {
  constructor(props) {
    super(props);
    console.log("Households props in constructor", this.props.freshData);

    this._dataList = this.props.freshData;
    let accountsArray = this._dataList._cache;
    let result = [];
    accountsArray.forEach(a => {
      a.accounts.forEach(account => {
        result.push(account);
      })
    })
    this._allAccountsList = new AccountsGridStore(result);
    console.log('this._allAccountList::', this._allAccountsList);

    this._defaultSortIndexes = [];
    let size = this._dataList.size;
    for (let index = 0; index < size; index++) {
      this._defaultSortIndexes.push(index);
    };

    let aboutColumnsWidth = (window.innerWidth - 95) / 7;
    let ladderColumnsWidth = (window.innerWidth - 95) / 7;
    let detailsColumnsWidth = (window.innerWidth - 95) / 5;

    // ordered alphabetically
    this.state = {
      aboutColumnsHidden: true,
      accountsDataList: this._allAccountsList,
      adjustedDataList: this._dataList,
      allRowsExpanded: false,
      collapsedRows: new Set(),
      collapsedAccountRows: new Set(),
      colSortDirs: {},
      colWidth: 0,
      columnWidths: {
        name: aboutColumnsWidth,
        description: 0,
        model: 0,
        balance: ladderColumnsWidth,
        marketValue: ladderColumnsWidth,
        accountNumber: detailsColumnsWidth,
        cusip: detailsColumnsWidth,
        currentPrice: detailsColumnsWidth,
        maturityDate: detailsColumnsWidth,
        quantity: detailsColumnsWidth
      },
      dataListSize: this._dataList.size,
      filtersVisible: true,
      groupByHousehold: true,
      height: '0',
      marketValueFilterValue: 0,
      percentageFilterValue: 0,
      scrollToRow: null,
      tableWidth: 0,
      width: '0',
    }

    // order of appearance
    this.toggleTableGrouping = this.toggleTableGrouping.bind(this);
    this.toggleAboutColumnGroup = this.toggleAboutColumnGroup.bind(this);
    this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this);
    this.handleExpandAllRows = this.handleExpandAllRows.bind(this);
    this.toggleFilters = this.toggleFilters.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onSortChange = this._onSortChange.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this._handleCollapseClick = this._handleCollapseClick.bind(this);
    this._handleCollapseAllClick = this._handleCollapseAllClick.bind(this);
    this._subRowHeightGetter = this._subRowHeightGetter.bind(this);
    this._rowExpandedGetter = this._rowExpandedGetter.bind(this);
  }

  toggleTableGrouping() {
    this.setState({ groupByHousehold: !this.state.groupByHousehold });
  }

  toggleAboutColumnGroup() {
    const { aboutColumnsHidden } = this.state;
    this.setState({ aboutColumnsHidden: !aboutColumnsHidden });
    this.setState({ columnWidths: {
      description: aboutColumnsHidden ? 0 : (window.innerWidth - 95) / 5,
      model: aboutColumnsHidden ? 0 : (window.innerWidth - 95) / 5
    }})
    this.updateWindowDimensions();
  }

  _onColumnResizeEndCallback(newColumnWidth, columnKey) {
    this.setState(({columnWidths}) => ({
      columnWidths: {
        ...columnWidths,
        [columnKey]: newColumnWidth,
      }
    }));
  }

  handleExpandAllRows() {
    const { allRowsExpanded } = this.state;
    this.setState({
      allRowsExpanded: !allRowsExpanded
    })
  }

  toggleFilters() {
    this.setState({
      filtersVisible: !this.state.filtersVisible
    })
  }

  _onFilterChange(e, filteredColumn) {
    if (!e.target.value) {
      this.setState({
        adjustedDataList: this._dataList,
        dataListSize: this._dataList.size,
      });
    }

    let filterBy = e.target.value.toLowerCase();
    let size = this._dataList.size;
    let filteredIndexes = [];
    for (let index = 0; index < size; index++) {
      if (filteredColumn === 'name') {
        let {name} = this._dataList.getObjectAt(index);
        if (name.toLowerCase().indexOf(filterBy) !== -1) {
          filteredIndexes.push(index);
        }
      } else if (filteredColumn === 'description') {
        let {description} = this._dataList.getObjectAt(index);
        if (description.toLowerCase().indexOf(filterBy) !== -1) {
          filteredIndexes.push(index);
        }
      } else if (filteredColumn === 'model') {
        let {model} = this._dataList.getObjectAt(index);
        if (model.toLowerCase().indexOf(filterBy) !== -1) {
          filteredIndexes.push(index);
        }
      } else if (filteredColumn === 'percentage') {
        let {percentage} = this._dataList.getObjectAt(index);
        if (percentage.toLowerCase().indexOf(filterBy) !== -1) {
          filteredIndexes.push(index);
        }
      } else if (filteredColumn === 'marketValue') {
        let {value} = this._dataList.getObjectAt(index);
        if (value.toLowerCase().indexOf(filterBy) !== -1) {
          filteredIndexes.push(index);
        }
      }
    }
    let updatedPercentageValue = document.getElementById('percentage-filter').value;
    let updatedMarketValue = document.getElementById('market-value-filter').value;
    this.setState({
      adjustedDataList: new DataListWrapper(filteredIndexes, this._dataList),
      percentageFilterValue: updatedPercentageValue,
      marketValueFilterValue: updatedMarketValue
    });
  }

  _onSortChange(columnKey, sortDir) {
    let sortIndexes = this._defaultSortIndexes.slice();
    sortIndexes.sort((indexA, indexB) => {
      let valueA = this._dataList.getObjectAt(indexA)[columnKey];
      let valueB = this._dataList.getObjectAt(indexB)[columnKey];
      let sortVal = 0;
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
    this.setState({ tableWidth: window.innerWidth - 10 });
    this.setState({ colWidth: (window.innerWidth - 95) / 5 });
    this.setState({ columnWidths: {
      name: (window.innerWidth - 95) / 7,
      description: this.state.columnWidths.description ? (window.innerWidth - 95) / 5 : 0,
      model: this.state.columnWidths.model ? (window.innerWidth - 95) / 5 : 0,
      balance: (window.innerWidth - 95) / 7,
      marketValue: (window.innerWidth - 95) / 7,
      accountNumber: (window.innerWidth - 95) / 5,
      cusip: (window.innerWidth - 95) / 5,
      currentPrice: (window.innerWidth - 95) / 5,
      maturityDate: (window.innerWidth - 95) / 5,
      quantity: (window.innerWidth - 95) / 5
    }})
  }

  _handleCollapseClick(rowIndex) {
    const {collapsedRows} = this.state;
    const shallowCopyOfCollapsedRows = new Set([...collapsedRows]);

    if (shallowCopyOfCollapsedRows.has(rowIndex)) {
      shallowCopyOfCollapsedRows.delete(rowIndex);
    } else {
      shallowCopyOfCollapsedRows.add(rowIndex);
    }

    this.setState({
      collapsedRows: shallowCopyOfCollapsedRows,
    });
  }

  _handleCollapseAllClick() {
    const { collapsedRows, dataListSize, allRowsExpanded } = this.state;
    let shallowCopyOfCollapsedRows = new Set([...collapsedRows]);

    if (!allRowsExpanded) {
      this.handleExpandAllRows();
      for (let i = 0; i < dataListSize; i++) {
        if (!shallowCopyOfCollapsedRows.has(i)) {shallowCopyOfCollapsedRows.add(i);}
      }
    } else {
      this.handleExpandAllRows();
      shallowCopyOfCollapsedRows = new Set();
    }

    this.setState({
      scrollToRow: null,
      collapsedRows: shallowCopyOfCollapsedRows
    });
  }

  _subRowHeightGetter(index) {
    const { adjustedDataList } = this.state;
    let securitiesArray = [];
    let accountsArray = adjustedDataList._cache[index].accounts;
    accountsArray.forEach(a => {
      a.securities.forEach(s => {
        securitiesArray.push(s);
      })
    })
    return this.state.collapsedRows.has(index)
      ? (25 * securitiesArray.length) + 42
      : 0;
  }

  _rowExpandedGetter({rowIndex, width, height}) {
    if (!this.state.collapsedRows.has(rowIndex)) {
      return null;
    }
    let { adjustedDataList, tableWidth } = this.state;

    let securitiesArray = [];
    let numAccounts = 0;
    let accountsArray = adjustedDataList._cache[rowIndex].accounts;
    accountsArray.forEach(a => {
      numAccounts++;
      a.securities.forEach(s => {
        securitiesArray.push(s);
      })
    })
    let securitiesDataList = new SecuritiesGridStore(securitiesArray);
    let numSecurities = securitiesArray.length;
    let headerTooltip = '';
    numAccounts > 1
      ? headerTooltip = numAccounts + " accounts, " + numSecurities + " securities"
      : headerTooltip = numAccounts + " account, " + numSecurities + " securities";
    let expandedHeight = (25 * numSecurities) + 42;

    let detailsWidths = (window.innerWidth - 95) / 7;

    return (
          <Table
            rowHeight={25}
            rowsCount={numSecurities}
            headerHeight={25}
            onColumnResizeEndCallback={this._onColumnResizeEndCallback}
            isColumnResizing={false}
            width={tableWidth}
            height={expandedHeight}
            {...this.props}>
            <Column
              columnKey="id"
              header={
                <Cell>
                    <Tooltip title={headerTooltip} position='right'>
                      <div className="info-image">
                        <img id="info" src={require("./images/info.png")} alt="info" />
                      </div>
                    </Tooltip>
                </Cell>}
              cell={<TextCell data={securitiesDataList} />}
              width={40}
            />
            <Column
              columnKey="accountNumber"
              header={<Cell>Account #</Cell>}
              cell={<TextCell data={securitiesDataList} />}
              width={detailsWidths}
              flexGrow={0}
            />
            <Column
              columnKey="currentPrice"
              header={<Cell>Price</Cell>}
              cell={<TextCell data={securitiesDataList} />}
              width={0}
              flexGrow={0}
            />
            <Column
              columnKey="quantity"
              header={<Cell>Quantity</Cell>}
              cell={<TextCell data={securitiesDataList} />}
              width={0}
              flexGrow={0}
            />
            <Column
              columnKey="cusip"
              header={<Cell>CUSIP</Cell>}
              cell={<TextCell data={securitiesDataList} />}
              width={detailsWidths}
              flexGrow={1}
            />
            <Column
              columnKey="2017"
              header={<Cell>2017</Cell>}
              cell={<TextCell data={securitiesDataList} />}
              width={detailsWidths}
              flexGrow={1}
            />
            <Column
              columnKey="2018"
              header={<Cell>2018</Cell>}
              cell={<TextCell data={securitiesDataList} />}
              width={detailsWidths}
              flexGrow={1}
            />
            <Column
              columnKey="2019"
              header={<Cell>2019</Cell>}
              cell={<TextCell data={securitiesDataList} />}
              width={detailsWidths}
              flexGrow={1}
            />
            <Column
              columnKey="2020"
              header={<Cell>2020</Cell>}
              cell={<TextCell data={securitiesDataList} />}
              width={detailsWidths}
              flexGrow={1}
            />
            <Column
              columnKey="2021"
              header={<Cell>2021</Cell>}
              cell={<TextCell data={securitiesDataList} />}
              width={detailsWidths}
              flexGrow={1}
            />
          </Table>
    );
  }

  render() {
    let {percentageFilterValue, marketValueFilterValue, adjustedDataList, accountsDataList, colSortDirs, collapsedRows, scrollToRow, aboutColumnsHidden, allRowsExpanded, filtersVisible, columnWidths, tableWidth, groupByHousehold} = this.state;

    let columnFlexAbout = aboutColumnsHidden ? 0 : 1;

    let rowWidth = (tableWidth - 60) / 6;
    let tableHeight = (this.state.height * 0.83) - 45;
    let hiddenColumnsWidth = aboutColumnsHidden ? 0 : (window.innerWidth - 95) / 5;

    return (
      <div>
        <div id="grid-container">
      {
        groupByHousehold
          ?
          <Table
            scrollToRow={scrollToRow}
            rowHeight={40}
            rowsCount={adjustedDataList.size}
            subRowHeightGetter={this._subRowHeightGetter}
            rowExpanded={this._rowExpandedGetter}
            headerHeight={80}
            onColumnResizeEndCallback={this._onColumnResizeEndCallback}
            isColumnResizing={false}
            width={tableWidth}
            height={tableHeight}
            {...this.props}>
            <Column
              header={
                <div className="header-tools-container">
                  { !allRowsExpanded
                      ? <div onClick={this._handleCollapseAllClick}>
                          <ExpandAllRows />
                        </div>
                      : <div onClick={this._handleCollapseAllClick}>
                          <CollapseAllRows />
                        </div> }
                  { filtersVisible
                      ? <div onClick={this.toggleFilters}>
                          <HideFilters />
                        </div>
                      : <div onClick={this.toggleFilters}>
                          <ShowFilters />
                        </div> }
                </div>
              }
              cell={<CollapseCell
                callback={this._handleCollapseClick} collapsedRows={collapsedRows}
              />}
              width={40}
            />
            <Column
              columnKey="name"
              header={
                <div className="header-spacing">
                  <div id="name-header-group">
                    <SortHeaderCell id="name-header"
                      onSortChange={this._onSortChange}
                      sortDir={colSortDirs.name}>
                      Name
                    </SortHeaderCell>
                    {
                      !aboutColumnsHidden
                        ? <span onClick={this.toggleAboutColumnGroup}>[-]</span>
                        : <span onClick={this.toggleAboutColumnGroup}>[+]</span>
                    }
                  </div>
                  <div id="filter-buffer" className={filtersVisible}>
                    <input className="grid-filter" id="name-filter" onChange={(e) => this._onFilterChange(e, 'name')} placeholder="Filter by Name"
                    />
                  </div>
                </div>
              }
              cell={<TextCell data={adjustedDataList} />}
              width={columnWidths.name}
              isResizable={true}
            />
            <Column
              columnKey="description"
              header={
                <div className="header-spacing">
                  <SortHeaderCell id="description-header"
                    onSortChange={this._onSortChange}
                    sortDir={colSortDirs.description}>
                    Description
                  </SortHeaderCell>
                  <div id="filter-buffer" className={filtersVisible}>
                    <input className="grid-filter" id="description-filter" onChange={(e) => this._onFilterChange(e, 'description')} placeholder="Filter by Description"
                    />
                  </div>
                </div>
              }
              cell={<TextCell data={adjustedDataList} />}
              flexGrow={columnFlexAbout}
              width={hiddenColumnsWidth}
              isResizable={true}
            />
            <Column
              columnKey="model"
              header={
                <div className="header-spacing">
                  <SortHeaderCell
                    onSortChange={this._onSortChange}
                    sortDir={colSortDirs.model}>
                    Notes
                  </SortHeaderCell>
                  <div id="filter-buffer" className={filtersVisible}>
                    <input className="grid-filter" id="notes-filter" onChange={(e) => this._onFilterChange(e, 'model')} placeholder="Filter by Notes"
                    />
                  </div>
                </div>
              }
              cell={<TextCell data={adjustedDataList} />}
              flexGrow={columnFlexAbout}
              width={hiddenColumnsWidth}
              isResizable={true}
            />
            <Column
              columnKey="balance"
              header={
                <div className="header-spacing">
                  <SortHeaderCell
                    onSortChange={this._onSortChange}
                    sortDir={colSortDirs.percentage}>
                    % Optimized
                  </SortHeaderCell>
                  <div id="percentage-filter-container" className={filtersVisible}>
                    <select className="percentage-dropdown">
                      <option value=">" selected>&#62;</option>
                      <option value="=">=</option>
                      <option value="<">&#60;</option>
                    </select>
                    <div className="percentage-slider-container">
                      <input className="grid-filter" id="percentage-filter" onChange={(e) => this._onFilterChange(e, 'percentage')} type="range"
                      />
                      <div>&nbsp;{percentageFilterValue}&nbsp;%</div>
                    </div>
                  </div>
                </div>
              }
              cell={<TextCell data={adjustedDataList} />}
              flexGrow={1}
              width={columnWidths.balance}
              isResizable={true}
            />
            <Column
              columnKey="2017"
              header={
                <div className="header-spacing">
                  <SortHeaderCell
                    onSortChange={this._onSortChange}
                    sortDir={colSortDirs.value}>
                    2017
                  </SortHeaderCell>
                  <div id="percentage-filter-container" className={filtersVisible}>
                    <select className="percentage-dropdown">
                      <option value=">" selected>&#62;</option>
                      <option value="=">=</option>
                      <option value="<">&#60;</option>
                    </select>
                    <div className="percentage-slider-container">
                      <input className="grid-filter" id="market-value-filter" onChange={(e) => this._onFilterChange(e, 'marketValue')} type="range"
                      />
                      <div>&nbsp;$&nbsp;{marketValueFilterValue}</div>
                    </div>
                  </div>
                </div>
              }
              cell={<TextCell data={adjustedDataList} />}
              flexGrow={1}
              width={columnWidths.marketValue}
              isResizable={true}
            />
            <Column
              columnKey="2018"
              header={
                <div className="header-spacing">
                  <SortHeaderCell
                    onSortChange={this._onSortChange}
                    sortDir={colSortDirs.value}>
                    2018
                  </SortHeaderCell>
                  <div id="percentage-filter-container" className={filtersVisible}>
                    <select className="percentage-dropdown">
                      <option value=">" selected>&#62;</option>
                      <option value="=">=</option>
                      <option value="<">&#60;</option>
                    </select>
                    <div className="percentage-slider-container">
                      <input className="grid-filter" id="market-value-filter" onChange={(e) => this._onFilterChange(e, 'marketValue')} type="range"
                      />
                      <div>&nbsp;$&nbsp;{marketValueFilterValue}</div>
                    </div>
                  </div>
                </div>
              }
              cell={<TextCell data={adjustedDataList} />}
              flexGrow={1}
              width={columnWidths.marketValue}
              isResizable={true}
            />
            <Column
              columnKey="2019"
              header={
                <div className="header-spacing">
                  <SortHeaderCell
                    onSortChange={this._onSortChange}
                    sortDir={colSortDirs.value}>
                    2019
                  </SortHeaderCell>
                  <div id="percentage-filter-container" className={filtersVisible}>
                    <select className="percentage-dropdown">
                      <option value=">" selected>&#62;</option>
                      <option value="=">=</option>
                      <option value="<">&#60;</option>
                    </select>
                    <div className="percentage-slider-container">
                      <input className="grid-filter" id="market-value-filter" onChange={(e) => this._onFilterChange(e, 'marketValue')} type="range"
                      />
                      <div>&nbsp;$&nbsp;{marketValueFilterValue}</div>
                    </div>
                  </div>
                </div>
              }
              cell={<TextCell data={adjustedDataList} />}
              flexGrow={1}
              width={columnWidths.marketValue}
              isResizable={true}
            />
            <Column
              columnKey="2020"
              header={
                <div className="header-spacing">
                  <SortHeaderCell
                    onSortChange={this._onSortChange}
                    sortDir={colSortDirs.value}>
                    2020
                  </SortHeaderCell>
                  <div id="percentage-filter-container" className={filtersVisible}>
                    <select className="percentage-dropdown">
                      <option value=">" selected>&#62;</option>
                      <option value="=">=</option>
                      <option value="<">&#60;</option>
                    </select>
                    <div className="percentage-slider-container">
                      <input className="grid-filter" id="market-value-filter" onChange={(e) => this._onFilterChange(e, 'marketValue')} type="range"
                      />
                      <div>&nbsp;$&nbsp;{marketValueFilterValue}</div>
                    </div>
                  </div>
                </div>
              }
              cell={<TextCell data={adjustedDataList} />}
              flexGrow={1}
              width={columnWidths.marketValue}
              isResizable={true}
            />
            <Column
              columnKey="2021"
              header={
                <div className="header-spacing">
                  <SortHeaderCell
                    onSortChange={this._onSortChange}
                    sortDir={colSortDirs.value}>
                    2021
                  </SortHeaderCell>
                  <div id="percentage-filter-container" className={filtersVisible}>
                    <select className="percentage-dropdown">
                      <option value=">" selected>&#62;</option>
                      <option value="=">=</option>
                      <option value="<">&#60;</option>
                    </select>
                    <div className="percentage-slider-container">
                      <input className="grid-filter" id="market-value-filter" onChange={(e) => this._onFilterChange(e, 'marketValue')} type="range"
                      />
                      <div>&nbsp;$&nbsp;{marketValueFilterValue}</div>
                    </div>
                  </div>
                </div>
              }
              cell={<TextCell data={adjustedDataList} />}
              flexGrow={1}
              width={columnWidths.marketValue}
              isResizable={true}
            />
          </Table>
          :
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
                <Cell onClick={this.toggleTableGrouping}>
                  <Tooltip title='Group by Household' position='right'>
                    <div id="group-image-container">
                      <img id="ungroup-image" src={require("../ClientsGrid/group.png")} alt="ungroup" />
                    </div>
                  </Tooltip>
                </Cell>
              }
              cell={<TextCell data={accountsDataList} />}
              fixed={false}
              width={40}
              flexGrow={0}
            />
            <Column
              columnKey="name"
              header={
                <SortHeaderCell
                  onSortChange={this._onSortChange}
                  sortDir={colSortDirs.portfolioDescription}>
                  Name
                </SortHeaderCell>
              }
              cell={<TextCell data={accountsDataList} />}
              fixed={false}
              width={rowWidth}
              flexGrow={0}
            />
            <Column
              columnKey="accountNumber"
              header={
                <SortHeaderCell
                  onSortChange={this._onSortChange}
                  sortDir={colSortDirs.underlyingPortfolioAccountNumber}>
                  Account Number
                </SortHeaderCell>
              }
              cell={<TextCell data={accountsDataList} />}
              width={rowWidth}
              flexGrow={1}
            />
            <Column
              columnKey="cusip"
              header={
                <SortHeaderCell
                  onSortChange={this._onSortChange}
                  sortDir={colSortDirs.symbolCUSIP}>
                  CUSIP
                </SortHeaderCell>
              }
              cell={<TextCell data={accountsDataList} />}
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
              cell={<TextCell data={accountsDataList} />}
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
              cell={<TextCell data={accountsDataList} />}
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
              cell={<TextCell data={accountsDataList} />}
              width={rowWidth}
              flexGrow={1}
            />
          </Table>
      }
        </div>
      </div>
    );
  }
}

export default HouseholdsGrid;
