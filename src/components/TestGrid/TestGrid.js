import React, {Component} from 'react';
import {Table, Column, Cell} from 'fixed-data-table-2';
import {ExpandAllRows, CollapseAllRows} from './GridCells/ExpandCollapseAllRows';
import {HideFilters, ShowFilters} from './GridCells/ToggleFilters';
import {DataListWrapper} from './GridCells/DataListWrapper';
import {CollapseCell, TextCell, SortHeaderCell} from './GridCells/HelperCells';
import UngroupHouseholds from './GridCells/UngroupHouseholds';
import AccountsGridStore from './TestAccountsGridStore';
import SecuritiesGridStore from './TestSecuritiesGridStore';
import 'fixed-data-table-2/dist/fixed-data-table.min.css';
import './TestGrid.css';
import _ from 'lodash';

import Tooltip from 'react-tooltip-component';

const SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC',
};

// variables and functions starting with '_' are used by 'fixed-data-table-2' library
class TestGrid extends Component {
  constructor(props) {
    super(props);
    console.log("Households props in constructor", this.props.freshData);

    this._dataList = this.props.freshData;
    let accountsArray = this._dataList._cache;
    let result = [];
    let securitiesList = [];
    accountsArray.forEach(a => {
      a.accounts.forEach(account => {
        result.push(account);
        account.securities.forEach(s => {
          securitiesList.push(s);
        })
      })
    })
    this._allAccountsList = new AccountsGridStore(result);
    this._allSecuritiesList = new SecuritiesGridStore(securitiesList);
    console.log('this._allAccountList::', this._allAccountsList);
    console.log('this._allSecuritiesList::', this._allSecuritiesList);

    this._defaultSortIndexes = [];
    let size = this._dataList.size;
    for (let index = 0; index < size; index++) {
      this._defaultSortIndexes.push(index);
    };

    let aboutColumnsWidth = (window.innerWidth - 95) / 8;
    let ladderColumnsWidth = (window.innerWidth - 95) / 12.5;
    let balanceColumnWidth = (window.innerWidth - 95) / 12;
    let detailsColumnsWidth = (window.innerWidth - 95) / 5;

    // ordered alphabetically
    this.state = {
      aboutColumnsHidden: true,
      accountsDataList: this._allAccountsList,
      acctSecuritiesDataList: this._allSecuritiesList,
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
        balance: balanceColumnWidth,
        marketValue: ladderColumnsWidth,
        accountNumber: detailsColumnsWidth,
        cusip: detailsColumnsWidth,
        currentPrice: detailsColumnsWidth,
        maturityDate: detailsColumnsWidth,
        quantity: detailsColumnsWidth
      },
      dataListSize: this._dataList.size,
      expandedDataList: this._dataList._cache,
      filtersVisible: true,
      groupByHousehold: true,
      height: '0',
      marketValueFilterValue: 0,
      percentageFilterValue: 0,
      scrollToRow: null,
      showYearGroupOne: true,
      showYearGroupTwo: false,
      showYearGroupThree: false,
      tableWidth: 0,
      width: '0',
    }

    // order of appearance
    this.handleArrowKeys = this.handleArrowKeys.bind(this);
    this.getYearsStart = this.getYearsStart.bind(this);
    this.getYearsEnd = this.getYearsEnd.bind(this);
    this.getYearsAfter = this.getYearsAfter.bind(this);
    this.getYearsBefore = this.getYearsBefore.bind(this);
    this.toggleTableGrouping = this.toggleTableGrouping.bind(this);
    this.toggleAboutColumnGroup = this.toggleAboutColumnGroup.bind(this);
    this.handleExpandAllRows = this.handleExpandAllRows.bind(this);
    this.toggleFilters = this.toggleFilters.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onSortChange = this._onSortChange.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this._handleCollapseClick = this._handleCollapseClick.bind(this);
    this._handleCollapseAllClick = this._handleCollapseAllClick.bind(this);
    // this._subRowHeightGetter = this._subRowHeightGetter.bind(this);
  }

  handleArrowKeys = (e) => {
    if (e.code === 'ArrowRight') {
        this.getYearsAfter();
      }
      if (e.code === 'ArrowLeft') {
        this.getYearsBefore();
      }
  }

  getYearsStart() {
    let {showYearGroupOne, showYearGroupTwo, showYearGroupThree} = this.state;
    this.setState({showYearGroupOne: true, showYearGroupTwo: false, showYearGroupThree: false});
  }

  getYearsEnd() {
    let {showYearGroupOne, showYearGroupTwo, showYearGroupThree} = this.state;
    this.setState({showYearGroupOne: false, showYearGroupTwo: false, showYearGroupThree: true});
  }

  getYearsAfter() {
    let {showYearGroupOne, showYearGroupTwo, showYearGroupThree} = this.state;
    if (showYearGroupOne) {
      this.setState({ showYearGroupOne: false, showYearGroupTwo: true});
    }
    if (showYearGroupTwo) {
      this.setState({ showYearGroupTwo: false, showYearGroupThree: true});
    }
    if (showYearGroupThree) {
      this.setState({ showYearGroupThree: false, showYearGroupOne: true});
    }
  }

  getYearsBefore() {
    let {showYearGroupOne, showYearGroupTwo, showYearGroupThree} = this.state;
    if (showYearGroupOne) {
      this.setState({ showYearGroupOne: false, showYearGroupThree: true});
    }
    if (showYearGroupTwo) {
      this.setState({ showYearGroupTwo: false, showYearGroupOne: true});
    }
    if (showYearGroupThree) {
      this.setState({ showYearGroupThree: false, showYearGroupTwo: true});
    }
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
    document.addEventListener("keydown", this.handleArrowKeys, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
    document.removeEventListener("keydown", this.handleArrowKeys, false);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
    this.setState({ tableWidth: window.innerWidth - 10 });
    this.setState({ colWidth: (window.innerWidth - 95) / 5 });
    this.setState({ columnWidths: {
      name: (window.innerWidth - 95) / 8,
      description: this.state.columnWidths.description ? (window.innerWidth - 95) / 5 : 0,
      model: this.state.columnWidths.model ? (window.innerWidth - 95) / 5 : 0,
      balance: (window.innerWidth - 95) / 12,
      marketValue: (window.innerWidth - 95) / 12.5,
      accountNumber: (window.innerWidth - 95) / 5,
      cusip: (window.innerWidth - 95) / 5,
      currentPrice: (window.innerWidth - 95) / 5,
      maturityDate: (window.innerWidth - 95) / 5,
      quantity: (window.innerWidth - 95) / 5
    }})
  }

  _handleCollapseClick(rowIndex) {
    const {collapsedRows, adjustedDataList, dataListSize} = this.state;
    const shallowCopyOfCollapsedRows = new Set([...collapsedRows]);

    if (shallowCopyOfCollapsedRows.has(rowIndex)) {
      shallowCopyOfCollapsedRows.delete(rowIndex);
    } else {
      shallowCopyOfCollapsedRows.add(rowIndex);
    }

    this.setState({
      collapsedRows: shallowCopyOfCollapsedRows,
    });
    let indexMap = [];
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
    let newDataList = _.clone(adjustedDataList);
    let insertIndex = rowIndex;
    let rowsCount = adjustedDataList.size + 1;
    let securityHeader = {
      name: 'Account Number',
      type: 'header',
      description: 'Price',
      model: 'Quantity',
      balance: 'CUSIP',
      2017: '2017',
      2018: '2018',
      2019: '2019',
      2020: '2020',
      2021: '2021',
      2022: '2022',
      2023: '2023',
      2024: '2024',
      2025: '2025',
      2026: '2026',
      2027: '2027',
      2028: '2028',
      2029: '2029',
      2030: '2030',
      2031: '2031',
      2032: '2032',
      2033: '2033',
      2034: '2034',
      2035: '2035',
      2036: '2036',
      2037: '2037',
      2038: '2038',
      2039: '2039',
      2040: '2040',
      2041: '2041',
      2042: '2042',
      2043: '2043',
      2044: '2044',
      2045: '2045',
      2046: '2046'
    }
    securitiesArray.forEach(s => {
      newDataList._cache.splice(insertIndex + 1, 0, s);
      insertIndex++;
      rowsCount++;
    })
    newDataList._cache.splice(rowIndex + 1, 0, securityHeader);
    rowsCount++;
    console.log('adjustedDataList:()()()(): ', newDataList);
    console.log('dataListSize: ', adjustedDataList._cache.length);

    for (let i = 0; i < newDataList._cache.length; i++) {
      indexMap.push(i);
    }

    console.log('indexMap :', indexMap);

    this.setState({
      adjustedDataList: new DataListWrapper(indexMap, newDataList),
      expandedDataList: newDataList._cache,
      dataListSize: newDataList._cache.length });
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

  // _subRowHeightGetter(index) {
  //   const { adjustedDataList, groupByHousehold } = this.state;
  //   let newRows = 0;
  //   adjustedDataList._cache.forEach(h => {
  //     if (h.type === 'header' || h.type === 'security') {
  //       newRows++;
  //     }
  //   })
  //
  //   return this.state.collapsedRows.has(index) && groupByHousehold
  //   ? (40 * newRows) + 42
  //   : 0;
  // }

  render() {
    let {percentageFilterValue, marketValueFilterValue, adjustedDataList, expandedDataList, accountsDataList, acctSecuritiesDataList, colSortDirs, collapsedRows, scrollToRow, aboutColumnsHidden, allRowsExpanded, filtersVisible, columnWidths, tableWidth, groupByHousehold, showYearGroupOne, showYearGroupTwo, showYearGroupThree, dataListSize} = this.state;

    let columnFlexAbout = aboutColumnsHidden ? 0 : 1;

    let rowWidth = (tableWidth - 60) / 6;
    let tableHeight = (this.state.height * 0.79) - 45;
    let hiddenColumnsWidth = aboutColumnsHidden ? 0 : (window.innerWidth - 95) / 7;
    let detailsGroupWidth = aboutColumnsHidden ? columnWidths.name : (columnWidths.name * 3);
    let yearGroupOneWidth = showYearGroupOne ? columnWidths.marketValue : 0;
    let yearGroupTwoWidth = showYearGroupTwo ? columnWidths.marketValue : 0;
    let yearGroupThreeWidth = showYearGroupThree ? columnWidths.marketValue : 0;
    let yearGroupOneFlex = showYearGroupOne ? 1 : 0;
    let yearGroupTwoFlex = showYearGroupTwo ? 1 : 0;
    let yearGroupThreeFlex = showYearGroupThree ? 1 : 0;
    let ladderGroupWidth = tableWidth - 65 - detailsGroupWidth;
    let detailsGroupFlex = aboutColumnsHidden ? 0 : 1;

    return (
      <div>
        <div id="grid-container">
      {
        groupByHousehold
          ?
            <div id="grid-header-tools">
              <Table
                rowHeight={40}
                rowsCount={0}
                headerHeight={40}
                width={tableWidth}
                height={40}
                {...this.props}>
                <Column
                  header={
                    <Cell onClick={this.toggleTableGrouping}>
                      <UngroupHouseholds />
                    </Cell>}
                  width={40}
                  fixed={true}
                />
                <Column
                  header={
                    <div id="about-header" onClick={this.toggleAboutColumnGroup}>
                      <Cell>Details</Cell>
                      {
                        !aboutColumnsHidden
                          ? <span onClick={this.toggleAboutColumnGroup}>[-]</span>
                          : <span onClick={this.toggleAboutColumnGroup}>[+]</span>
                      }
                    </div>
                  }
                  width={detailsGroupWidth}
                />
                <Column
                  header={
                    <div id="ladder-header">
                      <Cell>Bond Ladder</Cell>
                      <div>
                        <span onClick={this.getYearsStart}>
                          <img className="years-control" src={require("./images/doubleLeftArrow.png")} alt="left" />
                        </span>
                        <span onClick={this.getYearsBefore}>
                          <img className="years-control" src={require("./images/leftArrow.png")} alt="left" />
                        </span>
                        <span onClick={this.getYearsAfter}>
                          <img className="years-control" src={require("./images/rightArrow.png")} alt="right" />
                        </span>
                        <span onClick={this.getYearsEnd}>
                          <img className="years-control" src={require("./images/doubleRightArrow.png")} alt="right" />
                        </span>
                      </div>
                    </div>
                  }
                  width={ladderGroupWidth}
                />
              </Table>
            </div>
          : null
      }
      {
        groupByHousehold
          ?
          <Table
            scrollToRow={scrollToRow}
            rowHeight={40}
            rowsCount={adjustedDataList.getSize()}
            headerHeight={80}
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
                data={adjustedDataList._cache}
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
                  </div>
                  <div id="filter-buffer" className={filtersVisible}>
                    <input className="grid-filter" id="name-filter" onChange={(e) => this._onFilterChange(e, 'name')} placeholder="Filter by Name"
                    />
                  </div>
                </div>
              }
              cell={<TextCell data={adjustedDataList} />}
              width={columnWidths.name}
            />
            <Column
              columnKey="description"
              header={
                <div className="header-spacing">
                  <SortHeaderCell id="description-header"
                    onSortChange={this._onSortChange}
                    sortDir={colSortDirs.description}>
                    Model
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
            />
            <Column
              columnKey="model"
              header={
                <div className="header-spacing">
                  <SortHeaderCell
                    onSortChange={this._onSortChange}
                    sortDir={colSortDirs.model}>
                    Model ID
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
                </div>
              }
              cell={<TextCell data={adjustedDataList} />}
              width={columnWidths.balance}
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
                </div>
              }
              cell={<TextCell data={adjustedDataList} />}
              flexGrow={yearGroupOneFlex}
              width={yearGroupOneWidth}
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
                </div>
              }
              cell={<TextCell data={adjustedDataList} />}
              flexGrow={yearGroupOneFlex}
              width={yearGroupOneWidth}
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
                </div>
              }
              cell={<TextCell data={adjustedDataList} />}
              flexGrow={yearGroupOneFlex}
              width={yearGroupOneWidth}
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
                </div>
              }
              cell={<TextCell data={adjustedDataList} />}
              flexGrow={yearGroupOneFlex}
              width={yearGroupOneWidth}
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
                </div>
              }
              cell={<TextCell data={adjustedDataList} />}
              flexGrow={yearGroupOneFlex}
              width={yearGroupOneWidth}
            />
            <Column
              columnKey="2022"
              header={
                <div className="header-spacing">
                  <SortHeaderCell
                    onSortChange={this._onSortChange}
                    sortDir={colSortDirs.value}>
                    2022
                  </SortHeaderCell>
                </div>
              }
              cell={<TextCell data={adjustedDataList} />}
              flexGrow={yearGroupOneFlex}
              width={yearGroupOneWidth}
            />
            <Column
              columnKey="2023"
              header={
                <div className="header-spacing">
                  <SortHeaderCell
                    onSortChange={this._onSortChange}
                    sortDir={colSortDirs.value}>
                    2023
                  </SortHeaderCell>
                </div>
              }
              cell={<TextCell data={adjustedDataList} />}
              flexGrow={yearGroupOneFlex}
              width={yearGroupOneWidth}
            />
            <Column
              columnKey="2024"
              header={
                <div className="header-spacing">
                  <SortHeaderCell
                    onSortChange={this._onSortChange}
                    sortDir={colSortDirs.value}>
                    2024
                  </SortHeaderCell>
                </div>
              }
              cell={<TextCell data={adjustedDataList} />}
              flexGrow={yearGroupOneFlex}
              width={yearGroupOneWidth}
            />
            <Column
              columnKey="2025"
              header={
                <div className="header-spacing">
                  <SortHeaderCell
                    onSortChange={this._onSortChange}
                    sortDir={colSortDirs.value}>
                    2025
                  </SortHeaderCell>
                </div>
              }
              cell={<TextCell data={adjustedDataList} />}
              flexGrow={yearGroupOneFlex}
              width={yearGroupOneWidth}
            />
            <Column
              columnKey="2026"
              header={
                <div className="header-spacing">
                  <SortHeaderCell
                    onSortChange={this._onSortChange}
                    sortDir={colSortDirs.value}>
                    2026
                  </SortHeaderCell>
                </div>
              }
              cell={<TextCell data={adjustedDataList} />}
              flexGrow={yearGroupOneFlex}
              width={yearGroupOneWidth}
            />
            <Column
              columnKey="2027"
              header={
                <div className="header-spacing">
                  <SortHeaderCell
                    onSortChange={this._onSortChange}
                    sortDir={colSortDirs.value}>
                    2027
                  </SortHeaderCell>
                </div>
              }
              cell={<TextCell data={adjustedDataList} />}
              flexGrow={yearGroupTwoFlex}
              width={yearGroupTwoWidth}
            />
            <Column
              columnKey="2028"
              header={
                <div className="header-spacing">
                  <SortHeaderCell
                    onSortChange={this._onSortChange}
                    sortDir={colSortDirs.value}>
                    2028
                  </SortHeaderCell>
                </div>
              }
              cell={<TextCell data={adjustedDataList} />}
              flexGrow={yearGroupTwoFlex}
              width={yearGroupTwoWidth}
            />
            <Column
              columnKey="2029"
              header={
                <div className="header-spacing">
                  <SortHeaderCell
                    onSortChange={this._onSortChange}
                    sortDir={colSortDirs.value}>
                    2029
                  </SortHeaderCell>
                </div>
              }
              cell={<TextCell data={adjustedDataList} />}
              flexGrow={yearGroupTwoFlex}
              width={yearGroupTwoWidth}
            />
            <Column
              columnKey="2030"
              header={
                <div className="header-spacing">
                  <SortHeaderCell
                    onSortChange={this._onSortChange}
                    sortDir={colSortDirs.value}>
                    2030
                  </SortHeaderCell>
                </div>
              }
              cell={<TextCell data={adjustedDataList} />}
              flexGrow={yearGroupTwoFlex}
              width={yearGroupTwoWidth}
            />
            <Column
              columnKey="2031"
              header={
                <div className="header-spacing">
                  <SortHeaderCell
                    onSortChange={this._onSortChange}
                    sortDir={colSortDirs.value}>
                    2031
                  </SortHeaderCell>
                </div>
              }
              cell={<TextCell data={adjustedDataList} />}
              flexGrow={yearGroupTwoFlex}
              width={yearGroupTwoWidth}
            />
            <Column
              columnKey="2032"
              header={
                <div className="header-spacing">
                  <SortHeaderCell
                    onSortChange={this._onSortChange}
                    sortDir={colSortDirs.value}>
                    2032
                  </SortHeaderCell>
                </div>
              }
              cell={<TextCell data={adjustedDataList} />}
              flexGrow={yearGroupTwoFlex}
              width={yearGroupTwoWidth}
            />
            <Column
              columnKey="2033"
              header={
                <div className="header-spacing">
                  <SortHeaderCell
                    onSortChange={this._onSortChange}
                    sortDir={colSortDirs.value}>
                    2033
                  </SortHeaderCell>
                </div>
              }
              cell={<TextCell data={adjustedDataList} />}
              flexGrow={yearGroupTwoFlex}
              width={yearGroupTwoWidth}
            />
            <Column
              columnKey="2034"
              header={
                <div className="header-spacing">
                  <SortHeaderCell
                    onSortChange={this._onSortChange}
                    sortDir={colSortDirs.value}>
                    2034
                  </SortHeaderCell>
                </div>
              }
              cell={<TextCell data={adjustedDataList} />}
              flexGrow={yearGroupTwoFlex}
              width={yearGroupTwoWidth}
            />
            <Column
              columnKey="2035"
              header={
                <div className="header-spacing">
                  <SortHeaderCell
                    onSortChange={this._onSortChange}
                    sortDir={colSortDirs.value}>
                    2035
                  </SortHeaderCell>
                </div>
              }
              cell={<TextCell data={adjustedDataList} />}
              flexGrow={yearGroupTwoFlex}
              width={yearGroupTwoWidth}
            />
            <Column
              columnKey="2036"
              header={
                <div className="header-spacing">
                  <SortHeaderCell
                    onSortChange={this._onSortChange}
                    sortDir={colSortDirs.value}>
                    2036
                  </SortHeaderCell>
                </div>
              }
              cell={<TextCell data={adjustedDataList} />}
              flexGrow={yearGroupTwoFlex}
              width={yearGroupTwoWidth}
            />
            <Column
              columnKey="2037"
              header={
                <div className="header-spacing">
                  <SortHeaderCell
                    onSortChange={this._onSortChange}
                    sortDir={colSortDirs.value}>
                    2037
                  </SortHeaderCell>
                </div>
              }
              cell={<TextCell data={adjustedDataList} />}
              flexGrow={yearGroupThreeFlex}
              width={yearGroupThreeWidth}
            />
            <Column
              columnKey="2038"
              header={
                <div className="header-spacing">
                  <SortHeaderCell
                    onSortChange={this._onSortChange}
                    sortDir={colSortDirs.value}>
                    2038
                  </SortHeaderCell>
                </div>
              }
              cell={<TextCell data={adjustedDataList} />}
              flexGrow={yearGroupThreeFlex}
              width={yearGroupThreeWidth}
            />
            <Column
              columnKey="2039"
              header={
                <div className="header-spacing">
                  <SortHeaderCell
                    onSortChange={this._onSortChange}
                    sortDir={colSortDirs.value}>
                    2039
                  </SortHeaderCell>
                </div>
              }
              cell={<TextCell data={adjustedDataList} />}
              flexGrow={yearGroupThreeFlex}
              width={yearGroupThreeWidth}
            />
            <Column
              columnKey="2040"
              header={
                <div className="header-spacing">
                  <SortHeaderCell
                    onSortChange={this._onSortChange}
                    sortDir={colSortDirs.value}>
                    2040
                  </SortHeaderCell>
                </div>
              }
              cell={<TextCell data={adjustedDataList} />}
              flexGrow={yearGroupThreeFlex}
              width={yearGroupThreeWidth}
            />
            <Column
              columnKey="2041"
              header={
                <div className="header-spacing">
                  <SortHeaderCell
                    onSortChange={this._onSortChange}
                    sortDir={colSortDirs.value}>
                    2041
                  </SortHeaderCell>
                </div>
              }
              cell={<TextCell data={adjustedDataList} />}
              flexGrow={yearGroupThreeFlex}
              width={yearGroupThreeWidth}
            />
            <Column
              columnKey="2042"
              header={
                <div className="header-spacing">
                  <SortHeaderCell
                    onSortChange={this._onSortChange}
                    sortDir={colSortDirs.value}>
                    2042
                  </SortHeaderCell>
                </div>
              }
              cell={<TextCell data={adjustedDataList} />}
              flexGrow={yearGroupThreeFlex}
              width={yearGroupThreeWidth}
            />
            <Column
              columnKey="2043"
              header={
                <div className="header-spacing">
                  <SortHeaderCell
                    onSortChange={this._onSortChange}
                    sortDir={colSortDirs.value}>
                    2043
                  </SortHeaderCell>
                </div>
              }
              cell={<TextCell data={adjustedDataList} />}
              flexGrow={yearGroupThreeFlex}
              width={yearGroupThreeWidth}
            />
            <Column
              columnKey="2044"
              header={
                <div className="header-spacing">
                  <SortHeaderCell
                    onSortChange={this._onSortChange}
                    sortDir={colSortDirs.value}>
                    2044
                  </SortHeaderCell>
                </div>
              }
              cell={<TextCell data={adjustedDataList} />}
              flexGrow={yearGroupThreeFlex}
              width={yearGroupThreeWidth}
            />
            <Column
              columnKey="2045"
              header={
                <div className="header-spacing">
                  <SortHeaderCell
                    onSortChange={this._onSortChange}
                    sortDir={colSortDirs.value}>
                    2045
                  </SortHeaderCell>
                </div>
              }
              cell={<TextCell data={adjustedDataList} />}
              flexGrow={yearGroupThreeFlex}
              width={yearGroupThreeWidth}
            />
            <Column
              columnKey="2046"
              header={
                <div className="header-spacing">
                  <SortHeaderCell
                    onSortChange={this._onSortChange}
                    sortDir={colSortDirs.value}>
                    2046
                  </SortHeaderCell>
                </div>
              }
              cell={<TextCell data={adjustedDataList} />}
              flexGrow={yearGroupThreeFlex}
              width={yearGroupThreeWidth}
            />
          </Table>
          :
          <Table
            rowHeight={40}
            rowsCount={acctSecuritiesDataList.size}
            groupHeaderHeight={30}
            headerHeight={60}
            width={tableWidth}
            height={tableHeight}
            >
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
              cell={<TextCell data={acctSecuritiesDataList} />}
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
              cell={<TextCell data={acctSecuritiesDataList} />}
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
              cell={<TextCell data={acctSecuritiesDataList} />}
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
              cell={<TextCell data={acctSecuritiesDataList} />}
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
              cell={<TextCell data={acctSecuritiesDataList} />}
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
              cell={<TextCell data={acctSecuritiesDataList} />}
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
              cell={<TextCell data={acctSecuritiesDataList} />}
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

export default TestGrid;
