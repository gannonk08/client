import React, {Component} from 'react';
import {Table, Column, ColumnGroup, Cell} from 'fixed-data-table-2';
import UngroupHouseholds from './GridCells/UngroupHouseholds';
import {ExpandAllRows, CollapseAllRows} from './GridCells/ExpandCollapseAllRows';
import {HideFilters, ShowFilters} from './GridCells/ToggleFilters';
import {DataListWrapper} from './GridCells/DataListWrapper';
import {CollapseCell, TextCell, SortHeaderCell} from './GridCells/HelperCells';
import 'fixed-data-table-2/dist/fixed-data-table.min.css';
import './HouseholdsGrid.css';

import Tooltip from 'react-tooltip-component';

const SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC',
};

class HouseholdsGrid extends Component {
  constructor(props) {
    super(props);
    console.log("HouseholdsGrid props in constructor", this.props.freshData);

    this._dataList = this.props.freshData;

    this._defaultSortIndexes = [];
    let size = this._dataList.size;
    for (let index = 0; index < size; index++) {
      this._defaultSortIndexes.push(index);
    };

    this.state = {
      scrollToRow: null,
      collapsedRows: new Set(),
      adjustedDataList: this._dataList,
      dataListSize: this._dataList.size,
      colSortDirs: {},
      width: '0',
      height: '0',
      colWidth: 0,
      tableWidth: 0,
      percentageFilterValue: 0,
      marketValueFilterValue: 0,
      aboutColumnsHidden: false,
      detailsColumnsHidden: true,
      ladderColumnsHidden: false,
      allRowsExpanded: false,
      filtersVisible: true,
      groupByHousehold: true,
      columnWidths: {
        name: 150,
        description: 150,
        model: 150,
        balance: 150,
        marketValue: 150,
        accountNumber: 0,
        cusip: 0,
        currentPrice: 0,
        maturityDate: 0,
        quantity: 0
      },
    }

    this._handleCollapseClick = this._handleCollapseClick.bind(this);
    this._handleCollapseAllClick = this._handleCollapseAllClick.bind(this);
    this._subRowHeightGetter = this._subRowHeightGetter.bind(this);
    this._rowExpandedGetter = this._rowExpandedGetter.bind(this);
    this._onSortChange = this._onSortChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.toggleAboutColumnGroup = this.toggleAboutColumnGroup.bind(this);
    this.toggleDetailsColumnGroup = this.toggleDetailsColumnGroup.bind(this);
    this.toggleLadderColumnGroup = this.toggleLadderColumnGroup.bind(this);
    this.handleExpandAllRows = this.handleExpandAllRows.bind(this);
    this.toggleFilters = this.toggleFilters.bind(this);
    this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this);
    this.toggleTableGrouping = this.toggleTableGrouping.bind(this);
    this.toggleAllColumnGroups = this.toggleAllColumnGroups.bind(this);
  }

  toggleTableGrouping() {
    this.setState({ groupByHousehold: !this.state.groupByHousehold });
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
    let { aboutColumnsHidden, detailsColumnsHidden, ladderColumnsHidden } = this.state;
    this.setState({ width: window.innerWidth, height: window.innerHeight });
    this.setState({ tableWidth: window.innerWidth - 10 });
    this.setState({ colWidth: (window.innerWidth - 95) / 5 });
    this.setState({ columnWidths: {
      name: (window.innerWidth - 95) / 5,
      description: !aboutColumnsHidden ? 0 : (window.innerWidth - 95) / 5,
      model: !aboutColumnsHidden ? 0 : (window.innerWidth - 95) / 5,
      balance: (window.innerWidth - 95) / 5,
      marketValue: !ladderColumnsHidden ? 0 : (window.innerWidth - 95) / 5,
      accountNumber: !detailsColumnsHidden ? (window.innerWidth - 95) / 7 : 0,
      cusip: !detailsColumnsHidden ? (window.innerWidth - 95) / 7 : 0,
      currentPrice: !detailsColumnsHidden ? (window.innerWidth - 95) / 7 : 0,
      maturityDate: !detailsColumnsHidden ? (window.innerWidth - 95) / 7 : 0,
      quantity: !detailsColumnsHidden ? (window.innerWidth - 95) / 7 : 0
    }})
  }

  _handleCollapseClick(rowIndex) {
    const {collapsedRows} = this.state;
    console.log("collapsedRows: ", collapsedRows);
    const shallowCopyOfCollapsedRows = new Set([...collapsedRows]);
    let scrollToRow = rowIndex;
    if (shallowCopyOfCollapsedRows.has(rowIndex)) {
      shallowCopyOfCollapsedRows.delete(rowIndex);
      scrollToRow = null
    } else {
      shallowCopyOfCollapsedRows.add(rowIndex);
    }

    let showDetails = collapsedRows.size === 0 && shallowCopyOfCollapsedRows.size === 1;
    let hideDetails = collapsedRows.size === 1 && shallowCopyOfCollapsedRows.size === 0;

    if (showDetails || hideDetails) {this.toggleAllColumnGroups();}

    this.setState({
      scrollToRow: scrollToRow,
      collapsedRows: shallowCopyOfCollapsedRows,
    });
  }

  _handleCollapseAllClick() {
    const { collapsedRows, dataListSize, allRowsExpanded, detailsColumnsHidden } = this.state;
    let shallowCopyOfCollapsedRows = new Set([...collapsedRows]);

    if (!allRowsExpanded) {
      this.handleExpandAllRows();
      for (let i = 0; i < dataListSize; i++) {
        if (!shallowCopyOfCollapsedRows.has(i)) {shallowCopyOfCollapsedRows.add(i);}
      }
      if (detailsColumnsHidden) {this.toggleAllColumnGroups();}
    } else {
      this.handleExpandAllRows();
      shallowCopyOfCollapsedRows = new Set();
      this.toggleAllColumnGroups();
    }

    this.setState({
      scrollToRow: null,
      collapsedRows: shallowCopyOfCollapsedRows
    });
  }

  _subRowHeightGetter(index) {
    return this.state.collapsedRows.has(index) ? 42 : 0;
  }

  _rowExpandedGetter({rowIndex, width, height}) {
    if (!this.state.collapsedRows.has(rowIndex)) {
      return null;
    }

    let { adjustedDataList, columnWidths, tableWidth } = this.state;
    let expandedHeight = (40 * adjustedDataList.size) + 2;
    console.log("columnWidths: ", columnWidths);

    return (
          <Table
            rowHeight={40}
            rowsCount={adjustedDataList.size}
            headerHeight={0}
            onColumnResizeEndCallback={this._onColumnResizeEndCallback}
            isColumnResizing={false}
            width={tableWidth}
            height={expandedHeight}
            {...this.props}>
            <Column
              header={<Cell>ID</Cell>}
              cell={<TextCell data={adjustedDataList} />}
              width={39}
            />
            <Column
            header={<Cell>Name</Cell>}
            cell={<TextCell data={adjustedDataList} />}
            width={columnWidths.name}
            />
            <Column
              columnKey="accountNumber"
              header={<Cell>First Name</Cell>}
              cell={<TextCell data={adjustedDataList} />}
              width={columnWidths.accountNumber}
            />
            <Column
              columnKey="cusip"
              header={<Cell>Last Name</Cell>}
              cell={<TextCell data={adjustedDataList} />}
              width={columnWidths.cusip}
            />
            <Column
              columnKey="currentPrice"
              header={<Cell>City</Cell>}
              cell={<TextCell data={adjustedDataList} />}
              width={columnWidths.currentPrice}
            />
            <Column
              columnKey="maturityDate"
              header={<Cell>Street</Cell>}
              cell={<TextCell data={adjustedDataList} />}
              width={columnWidths.maturityDate}
            />
            <Column
              columnKey="quantity"
              header={<Cell>Zip Code</Cell>}
              cell={<TextCell data={adjustedDataList} />}
              width={columnWidths.quantity}
            />
            <Column
            header={<Cell>% Out of Balance</Cell>}
            cell={<TextCell data={adjustedDataList} />}
            width={columnWidths.balance}
            />
            <Column
            header={<Cell>Market Value</Cell>}
            cell={<TextCell data={adjustedDataList} />}
            width={columnWidths.marketValue}
            />
          </Table>
    );
  }

  toggleAboutColumnGroup() {
    this.updateWindowDimensions();
    this.setState({ aboutColumnsHidden: !this.state.aboutColumnsHidden });
  }

  toggleDetailsColumnGroup() {
    this.updateWindowDimensions();
    this.setState({ detailsColumnsHidden: !this.state.detailsColumnsHidden });
  }

  toggleLadderColumnGroup() {
    this.updateWindowDimensions();
    this.setState({ ladderColumnsHidden: !this.state.ladderColumnsHidden });
  }

  toggleAllColumnGroups() {
    this.updateWindowDimensions();
    this.setState({
      detailsColumnsHidden: !this.state.detailsColumnsHidden,
      aboutColumnsHidden: !this.state.aboutColumnsHidden,
      ladderColumnsHidden: !this.state.ladderColumnsHidden
    });
  }

  render() {
    let {percentageFilterValue, marketValueFilterValue, adjustedDataList, colSortDirs, collapsedRows, scrollToRow, aboutColumnsHidden, detailsColumnsHidden, ladderColumnsHidden, allRowsExpanded, filtersVisible, columnWidths, tableWidth, groupByHousehold} = this.state;

    let columnFlexAbout = aboutColumnsHidden ? 0 : 1;
    let columnFlexDetails = detailsColumnsHidden ? 0 : 1;
    let columnFlexLadder = ladderColumnsHidden ? 0 : 1;

    let rowWidth = (tableWidth - 60) / 6;
    let tableHeight = (this.state.height * 0.783) - 45;

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
                    <Cell onClick={this.toggleAboutColumnGroup}>About &nbsp;
                      {
                        !aboutColumnsHidden
                          ? <span>[-]</span>
                          : <span>[+]</span>
                      }
                    </Cell>}
                  width={100}
                />
                <Column
                header={
                  <Cell onClick={this.toggleDetailsColumnGroup}>Details &nbsp;
                  {
                    !detailsColumnsHidden
                      ? <span>[-]</span>
                      : <span>[+]</span>
                  }
                  </Cell>}
                width={100}
                />
                <Column
                  columnKey="accountNumber"
                  header={
                    <Cell onClick={this.toggleLadderColumnGroup}>Ladder &nbsp;
                    {
                      !ladderColumnsHidden
                        ? <span>[-]</span>
                        : <span>[+]</span>
                    }
                    </Cell>}
                  width={100}
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
            rowsCount={adjustedDataList.size}
            subRowHeightGetter={this._subRowHeightGetter}
            rowExpanded={this._rowExpandedGetter}
            headerHeight={75}
            onColumnResizeEndCallback={this._onColumnResizeEndCallback}
            isColumnResizing={false}
            width={tableWidth}
            height={tableHeight}
            {...this.props}>
            <Column
              header={
                <div id="header-tools-container">
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
              fixed={true}
              width={40}
              flexGrow={0}
            />
              <Column
                columnKey="name"
                header={
                  <div>
                    <SortHeaderCell
                      onSortChange={this._onSortChange}
                      sortDir={colSortDirs.name}>
                      Name
                    </SortHeaderCell>
                    <div id="filter-buffer" className={filtersVisible}>
                      <input className="grid-filter" id="name-filter" onChange={(e) => this._onFilterChange(e, 'name')} placeholder="Filter by Name"
                      />
                    </div>
                  </div>
                }
                cell={<TextCell data={adjustedDataList} />}
                fixed={true}
                flexGrow={0}
                width={columnWidths.name}
                isResizable={true}
              />
              <Column
                columnKey="description"
                header={
                  <div>
                    <SortHeaderCell
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
                width={columnWidths.description}
                isResizable={true}
              />
              <Column
                columnKey="model"
                header={
                  <div>
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
                width={columnWidths.model}
                isResizable={true}
              />

              <Column
                header={
                  <div>
                    <SortHeaderCell
                      onSortChange={this._onSortChange}
                      sortDir={colSortDirs.accountNumber}>
                      Account Number
                    </SortHeaderCell>
                    <div id="filter-buffer" className={filtersVisible}>
                      <input className="grid-filter" id="notes-filter" onChange={(e) => this._onFilterChange(e, 'accountNumber')} placeholder="Filter by Symbol"
                      />
                    </div>
                  </div>
                }
                cell={<TextCell data={adjustedDataList} />}
                flexGrow={columnFlexDetails}
                width={columnWidths.accountNumber}
                isResizable={true}
              />
              <Column
                header={
                  <div>
                    <SortHeaderCell
                      onSortChange={this._onSortChange}
                      sortDir={colSortDirs.cusip}>
                      Symbol/CUSIP
                    </SortHeaderCell>
                    <div id="filter-buffer" className={filtersVisible}>
                      <input className="grid-filter" id="notes-filter" onChange={(e) => this._onFilterChange(e, 'cusip')} placeholder="Filter by Symbol"
                      />
                    </div>
                  </div>
                }
                cell={<TextCell data={adjustedDataList} />}
                flexGrow={columnFlexDetails}
                width={columnWidths.cusip}
                isResizable={true}
              />
              <Column
                header={
                  <div>
                    <SortHeaderCell
                      onSortChange={this._onSortChange}
                      sortDir={colSortDirs.currentPrice}>
                      Current Price
                    </SortHeaderCell>
                    <div id="percentage-filter-container" className={filtersVisible}>
                      <select className="percentage-dropdown">
                        <option value=">" selected>&#62;</option>
                        <option value="=">=</option>
                        <option value="<">&#60;</option>
                      </select>
                      <div className="percentage-slider-container">
                        <input className="grid-filter" id="current-price-filter" onChange={(e) => this._onFilterChange(e, 'currentPrice')} type="range"
                        />
                        <div>&nbsp;$&nbsp;{marketValueFilterValue}</div>
                      </div>
                    </div>
                  </div>
                }
                cell={<TextCell data={adjustedDataList} />}
                flexGrow={columnFlexDetails}
                width={columnWidths.currentPrice}
                isResizable={true}
              />
              <Column
                header={
                  <div>
                    <SortHeaderCell
                      onSortChange={this._onSortChange}
                      sortDir={colSortDirs.maturityDate}>
                      Maturity Date
                    </SortHeaderCell>
                    <div id="filter-buffer" className={filtersVisible}>
                      <input className="grid-filter" id="notes-filter" onChange={(e) => this._onFilterChange(e, 'maturityDate')} placeholder="Filter by Symbol" type="date"
                      />
                    </div>
                  </div>
                }
                cell={<TextCell data={adjustedDataList} />}
                flexGrow={columnFlexDetails}
                width={columnWidths.maturityDate}
                isResizable={true}
              />
              <Column
                header={
                  <div>
                    <SortHeaderCell
                      onSortChange={this._onSortChange}
                      sortDir={colSortDirs.quantity}>
                      Quantity
                    </SortHeaderCell>
                    <div id="percentage-filter-container" className={filtersVisible}>
                      <select className="percentage-dropdown">
                        <option value=">" selected>&#62;</option>
                        <option value="=">=</option>
                        <option value="<">&#60;</option>
                      </select>
                      <div className="percentage-slider-container">
                        <input className="grid-filter" id="quantity-filter" onChange={(e) => this._onFilterChange(e, 'quantity')} type="range"
                        />
                        <div>&nbsp;$&nbsp;{marketValueFilterValue}</div>
                      </div>
                    </div>
                  </div>
                }
                cell={<TextCell data={adjustedDataList} />}
                flexGrow={columnFlexDetails}
                width={columnWidths.quantity}
                isResizable={true}
              />

              <Column
                columnKey="balance"
                header={
                  <div>
                    <SortHeaderCell
                      onSortChange={this._onSortChange}
                      sortDir={colSortDirs.percentage}>
                      % Out-of-Balance
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
                flexGrow={0}
                width={columnWidths.balance}
                isResizable={true}
              />
              <Column
                columnKey="marketValue"
                header={
                  <div>
                    <SortHeaderCell
                      onSortChange={this._onSortChange}
                      sortDir={colSortDirs.value}>
                      Market Value
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
                flexGrow={columnFlexLadder}
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
              cell={<TextCell data={adjustedDataList} />}
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
                  Portfolio Description
                </SortHeaderCell>
              }
              cell={<TextCell data={adjustedDataList} />}
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
                  Underlying Portfolio Account Number
                </SortHeaderCell>
              }
              cell={<TextCell data={adjustedDataList} />}
              width={rowWidth}
              flexGrow={1}
            />
            <Column
              columnKey="cusip"
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
      }
        </div>
      </div>
    );
  }
}

export default HouseholdsGrid;
