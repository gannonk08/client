import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Table, Column, ColumnGroup, Cell } from 'fixed-data-table-2';
import Loader from 'react-loader';
import HouseholdsGridStore from './HouseholdsGridStore';
import ClientsGridStore from '../ClientsGrid/ClientsGridStore';
import { CollapseCell, TextCell } from './HouseholdsCells';
import 'fixed-data-table-2/dist/fixed-data-table.min.css';
import './HouseholdsGrid.css';
import Tooltip from 'react-tooltip-component';

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

class HouseholdsGrid extends Component {
  constructor(props) {
    super(props);

    const PATH_GET_CLIENTS = '/clients/088B5FAE-E78C-4817-9724-C93DF2AEB14D';
    let PATH_BASE = '';
    process.env.NODE_ENV === 'production'
    ? PATH_BASE = process.env.REACT_APP_API_PROD
    : PATH_BASE = process.env.REACT_APP_API_DEV;

    fetch(PATH_BASE + PATH_GET_CLIENTS, {
      mode: 'cors',
      credentials: 'include',
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    })
    .then (res => res.json())
    .then(res => {
      if (res.status === "OK") {
        console.log("new CLIENTS data in households grid constructor: ", res.records);
      }
    })
    .catch(e => console.log(e));

    this._dataList = new HouseholdsGridStore(2000);
    this._clientsDataList = new ClientsGridStore(2000);

    this._defaultSortIndexes = [];
    let size = this._dataList.size;
    for (var index = 0; index < size; index++) {
      this._defaultSortIndexes.push(index);
    }

    console.log("houeholds data list in constructor: ", this._dataList);
    console.log("clients data list in constructor: ", this._clientsDataList);

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
      loaded: false,
      allRowsExpanded: false,
      filtersVisible: true,
      columnWidths: {
        name: 150,
        description: 150,
        model: 150,
        balance: 150,
        marketValue: 150,
        accountNumber: 150,
        cusip: 150,
        currentPrice: 150,
        maturityDate: 150,
        quantity: 150
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

    var filterBy = e.target.value.toLowerCase();
    var size = this._dataList.size;
    var filteredIndexes = [];
    for (var index = 0; index < size; index++) {
      if (filteredColumn === 'name') {
        var {name} = this._dataList.getObjectAt(index);
        if (name.toLowerCase().indexOf(filterBy) !== -1) {
          filteredIndexes.push(index);
        }
      } else if (filteredColumn === 'description') {
        var {description} = this._dataList.getObjectAt(index);
        if (description.toLowerCase().indexOf(filterBy) !== -1) {
          filteredIndexes.push(index);
        }
      } else if (filteredColumn === 'model') {
        var {model} = this._dataList.getObjectAt(index);
        if (model.toLowerCase().indexOf(filterBy) !== -1) {
          filteredIndexes.push(index);
        }
      } else if (filteredColumn === 'percentage') {
        var {percentage} = this._dataList.getObjectAt(index);
        if (percentage.toLowerCase().indexOf(filterBy) !== -1) {
          filteredIndexes.push(index);
        }
      } else if (filteredColumn === 'marketValue') {
        var {value} = this._dataList.getObjectAt(index);
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
    this.setState({ loaded: true })
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
      name: aboutColumnsHidden ? 0 : (window.innerWidth - 95) / 5,
      description: aboutColumnsHidden ? 0 : (window.innerWidth - 95) / 5,
      model: aboutColumnsHidden ? 0 : (window.innerWidth - 95) / 5,
      balance: ladderColumnsHidden ? 0 : (window.innerWidth - 95) / 5,
      marketValue: ladderColumnsHidden ? 0 : (window.innerWidth - 95) / 5,
      accountNumber: detailsColumnsHidden ? 0 : (window.innerWidth - 95) / 7,
      cusip: detailsColumnsHidden ? 0 : (window.innerWidth - 95) / 7,
      currentPrice: detailsColumnsHidden ? 0 : (window.innerWidth - 95) / 7,
      maturityDate: detailsColumnsHidden ? 0 : (window.innerWidth - 95) / 7,
      quantity: detailsColumnsHidden ? 0 : (window.innerWidth - 95) / 7,
    }})
  }

  _handleCollapseClick(rowIndex) {
    const {collapsedRows} = this.state;
    const shallowCopyOfCollapsedRows = new Set([...collapsedRows]);
    console.log("shallowCopyOfCollapsedRows: ", shallowCopyOfCollapsedRows);
    let scrollToRow = rowIndex;
    if (shallowCopyOfCollapsedRows.has(rowIndex)) {
      shallowCopyOfCollapsedRows.delete(rowIndex);
      scrollToRow = null
    } else {
      shallowCopyOfCollapsedRows.add(rowIndex);
    }

    this.setState({
      scrollToRow: scrollToRow,
      collapsedRows: shallowCopyOfCollapsedRows,
    });

    if (!collapsedRows.size) {
      this.setState({
        aboutColumnsHidden: true,
        detailsColumnsHidden: false,
        ladderColumnsHidden: true
      });
      this.setState({ columnWidths: {
        name: (window.innerWidth - 95) / 5,
        description: 0,
        model: 0,
        balance: (window.innerWidth - 95) / 5,
        marketValue: 0,
        accountNumber: (window.innerWidth - 95) / 7,
        cusip: (window.innerWidth - 95) / 7,
        currentPrice: (window.innerWidth - 95) / 7,
        maturityDate: (window.innerWidth - 95) / 7,
        quantity: (window.innerWidth - 95) / 7,
      }});
    } else if (collapsedRows.size > 0) {
      this.setState({
        aboutColumnsHidden: false,
        detailsColumnsHidden: true,
        ladderColumnsHidden: false
      });
      this.setState({ columnWidths: {
        name: (window.innerWidth - 95) / 5,
        description: (window.innerWidth - 95) / 5,
        model: (window.innerWidth - 95) / 5,
        balance: (window.innerWidth - 95) / 5,
        marketValue: (window.innerWidth - 95) / 5,
        accountNumber: 0,
        cusip: 0,
        currentPrice: 0,
        maturityDate: 0,
        quantity: 0,
      }});
    }
  }

  _handleCollapseAllClick() {
    const { collapsedRows, dataListSize } = this.state;
    let shallowCopyOfCollapsedRows = new Set([...collapsedRows]);
    console.log("copyofcollapsedrows", shallowCopyOfCollapsedRows);
    console.log("dataListSize", dataListSize);
    this.handleExpandAllRows();
    for (let i = 0; i < dataListSize; i++) {
      shallowCopyOfCollapsedRows.has(i)
      ? shallowCopyOfCollapsedRows.delete(i)
      : shallowCopyOfCollapsedRows.add(i);
    }

    this.setState({
      scrollToRow: null,
      collapsedRows: shallowCopyOfCollapsedRows
    });

    if (!collapsedRows.size) {
      this.setState({
        aboutColumnsHidden: true,
        detailsColumnsHidden: false,
        ladderColumnsHidden: true
      });
      this.setState({ columnWidths: {
        name: (window.innerWidth - 95) / 5,
        description: 0,
        model: 0,
        balance: (window.innerWidth - 95) / 5,
        marketValue: 0,
        accountNumber: (window.innerWidth - 95) / 7,
        cusip: (window.innerWidth - 95) / 7,
        currentPrice: (window.innerWidth - 95) / 7,
        maturityDate: (window.innerWidth - 95) / 7,
        quantity: (window.innerWidth - 95) / 7,
      }});
    } else if (collapsedRows.size > 0) {
      this.setState({
        aboutColumnsHidden: false,
        detailsColumnsHidden: true,
        ladderColumnsHidden: false
      });
      this.setState({ columnWidths: {
        name: (window.innerWidth - 95) / 5,
        description: (window.innerWidth - 95) / 5,
        model: (window.innerWidth - 95) / 5,
        balance: (window.innerWidth - 95) / 5,
        marketValue: (window.innerWidth - 95) / 5,
        accountNumber: 0,
        cusip: 0,
        currentPrice: 0,
        maturityDate: 0,
        quantity: 0,
      }})
    }
  }

  _subRowHeightGetter(index) {
    return this.state.collapsedRows.has(index) ? 80 : 0;
  }

  _rowExpandedGetter({rowIndex, width, height}) {
    if (!this.state.collapsedRows.has(rowIndex)) {
      return null;
    }

    const containerStyle = {
      height: height,
      width: width - 2,
    };

    const expandedStyle = {
      backgroundColor: 'white',
      boxSizing: 'border-box',
      border: '1px solid #d3d3d3',
      padding: '20px',
      overflow: 'scroll',
      width: '100%'
    }
    return (
      <div style={containerStyle}>
        <div style={expandedStyle}>
          ...
        </div>
      </div>
    );
  }

  toggleAboutColumnGroup() {
    this.setState({ aboutColumnsHidden: !this.state.aboutColumnsHidden })
  }

  toggleDetailsColumnGroup() {
    this.setState({ detailsColumnsHidden: !this.state.detailsColumnsHidden })
  }

  toggleLadderColumnGroup() {
    this.setState({ ladderColumnsHidden: !this.state.ladderColumnsHidden })
  }

  render() {
    let {percentageFilterValue, marketValueFilterValue, adjustedDataList, colSortDirs, collapsedRows, scrollToRow, aboutColumnsHidden, detailsColumnsHidden, ladderColumnsHidden, loaded, allRowsExpanded, filtersVisible, columnWidths, tableWidth} = this.state;

    let columnFlexAbout = aboutColumnsHidden ? 0 : 1;
    let columnFlexDetails = detailsColumnsHidden ? 0 : 1;
    let columnFlexLadder = ladderColumnsHidden ? 0 : 1;
    let tableHeight = this.state.height * 0.783;
    return (
      <div>
        <Loader loaded={loaded}>
          <div id="grid-container">
            <Table
              scrollToRow={scrollToRow}
              rowHeight={40}
              rowsCount={adjustedDataList.size}
              subRowHeightGetter={this._subRowHeightGetter}
              rowExpanded={this._rowExpandedGetter}
              groupHeaderHeight={30}
              headerHeight={75}
              onColumnResizeEndCallback={this._onColumnResizeEndCallback}
              isColumnResizing={false}
              width={tableWidth}
              height={tableHeight}
              {...this.props}>
              <ColumnGroup
                header={
                  <Cell>
                    <Tooltip title='Ungroup Households' position='right'>
                      <div id="group-image-container">
                        <Link to={"/accounts"}>
                          <img id="group-image" src={require("./images/ungroup.png")} alt="ungroup" />
                        </Link>
                      </div>
                    </Tooltip>
                  </Cell>}>
                <Column
                  header={
                    <div id="header-tools-container">
                      {
                        !allRowsExpanded
                          ? <Tooltip title='Expand All Rows' position='right'>
                            <div className="header-tools">
                              <img id="group-image" src={require("./images/expandAll.png")} onClick={this._handleCollapseAllClick} alt="expand all" />
                            </div>
                          </Tooltip>
                          : <Tooltip title='Collapse All Rows' position='right'>
                            <div className="header-tools">
                              <img id="group-image" src={require("./images/collapseAll.png")} onClick={this._handleCollapseAllClick} alt="expand all" />
                            </div>
                          </Tooltip>
                      }
                      {
                        filtersVisible
                          ? <Tooltip title='Hide Filters' position='right'>
                            <div className="header-tools">
                              <img id="group-image" src={require("./images/hideFilters.png")} onClick={this.toggleFilters} alt="hide filters" />
                            </div>
                          </Tooltip>
                          : <Tooltip title='Show Filters' position='right'>
                            <div className="header-tools">
                              <img id="group-image" src={require("./images/showFilters.png")} onClick={this.toggleFilters} alt="hide filters" />
                            </div>
                          </Tooltip>
                      }
                    </div>
                    }
                  cell={<CollapseCell callback={this._handleCollapseClick} collapsedRows={collapsedRows} />}
                  fixed={true}
                  width={40}
                  flexGrow={0}
                />
              </ColumnGroup>
              <ColumnGroup
                header={
                  <Cell onClick={this.toggleAboutColumnGroup}>About &nbsp;
                    {
                      !aboutColumnsHidden
                        ? <span>[-]</span>
                        : <span>[+]</span>
                    }
                  </Cell>}>
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
              </ColumnGroup>
              <ColumnGroup
                header={
                  <Cell onClick={this.toggleDetailsColumnGroup}>Details &nbsp;
                  {
                    !detailsColumnsHidden
                      ? <span>[-]</span>
                      : <span>[+]</span>
                  }
                  </Cell>}>
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
              </ColumnGroup>
              <ColumnGroup
                header={
                  <Cell onClick={this.toggleLadderColumnGroup}>Ladder &nbsp;
                  {
                    !ladderColumnsHidden
                      ? <span>[-]</span>
                      : <span>[+]</span>
                  }
                  </Cell>}>
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
              </ColumnGroup>
            </Table>
          </div>
        </Loader>
      </div>
    );
  }
}

export default HouseholdsGrid;
