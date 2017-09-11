import React, {Component} from 'react';
import { Table, Column, ColumnGroup, Cell } from 'fixed-data-table-2';
import HouseholdsGridStore from './HouseholdsGridStore';
import ClientsGridStore from '../ClientsGrid/ClientsGridStore';
import { CollapseCell, TextCell } from './HouseholdsCells';
import 'fixed-data-table-2/dist/fixed-data-table.min.css';
import './HouseholdsGrid.css';

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

    this._dataList = new HouseholdsGridStore(2000);
    this._clientsDataList = new ClientsGridStore(2000);

    this._defaultSortIndexes = [];
    let size = this._dataList.getSize();
    for (var index = 0; index < size; index++) {
      this._defaultSortIndexes.push(index);
    }

    console.log("houeholds data list in constructor: ", this._dataList);
    console.log("clients data list in constructor: ", this._clientsDataList);

    this.state = {
      scrollToRow: null,
      collapsedRows: new Set(),
      adjustedDataList: this._dataList,
      colSortDirs: {},
      width: '0',
      height: '0',
      percentageFilterValue: 0,
      aboutColumnsHidden: false,
      detailsColumnsHidden: false
    }

    this._handleCollapseClick = this._handleCollapseClick.bind(this);
    this._subRowHeightGetter = this._subRowHeightGetter.bind(this);
    this._rowExpandedGetter = this._rowExpandedGetter.bind(this);
    this._onSortChange = this._onSortChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.toggleAboutColumnGroup = this.toggleAboutColumnGroup.bind(this);
    this.toggleDetailsColumnGroup = this.toggleDetailsColumnGroup.bind(this);
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

  _handleCollapseClick(rowIndex) {
    const {collapsedRows} = this.state;
    const shallowCopyOfCollapsedRows = new Set([...collapsedRows]);
    let scrollToRow = rowIndex;
    if (shallowCopyOfCollapsedRows.has(rowIndex)) {
      shallowCopyOfCollapsedRows.delete(rowIndex);
      scrollToRow = null
    } else {
      shallowCopyOfCollapsedRows.add(rowIndex);
    }

    this.setState({
      scrollToRow: scrollToRow,
      collapsedRows: shallowCopyOfCollapsedRows
    });
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

  setFlexGrow

  render() {
    let {percentageFilterValue, adjustedDataList, colSortDirs, collapsedRows, scrollToRow, aboutColumnsHidden, detailsColumnsHidden} = this.state;
    let tableWidth = this.state.width - 10;
    let rowWidth = (tableWidth - 40) / 5;
    let rowWidthAbout = aboutColumnsHidden ? 0 : ((tableWidth - 40) / 5);
    let rowWidthDetails = detailsColumnsHidden ? 0 : ((tableWidth - 40) / 5);
    let columnFlexAbout = aboutColumnsHidden ? 0 : 1;
    let columnFlexDetails = detailsColumnsHidden ? 0 : 1;
    let tableHeight = this.state.height * 0.781;
    let columnOneStyle = { width: "40px" }
    let columnMainStyle = {
      width: rowWidth,
      display: "flex",
      justifyContent: "flex-start"
    }
    let columnAboutStyle = {
      width: rowWidth * 2,
      display: "flex",
      justifyContent: "space-between"
    }
    return (
      <div>
        <div id="grid-container">
          <Table
            scrollToRow={scrollToRow}
            rowHeight={40}
            rowsCount={adjustedDataList.getSize()}
            subRowHeightGetter={this._subRowHeightGetter}
            rowExpanded={this._rowExpandedGetter}
            groupHeaderHeight={30}
            headerHeight={75}
            width={tableWidth}
            height={tableHeight}
            {...this.props}>
            <ColumnGroup
              header={<Cell></Cell>}>
              <Column
                cell={<CollapseCell callback={this._handleCollapseClick} collapsedRows={collapsedRows} />}
                fixed={true}
                width={40}
                flexGrow={0}
              />
            </ColumnGroup>
            <ColumnGroup
              header={
                <Cell>About &nbsp;
                  {
                    !aboutColumnsHidden
                      ? <span onClick={this.toggleAboutColumnGroup}>[-]</span>
                      : <span onClick={this.toggleAboutColumnGroup}>[+]</span>
                  }
                </Cell>}>
              <Column
                columnKey="firstName"
                header={
                  <div>
                    <SortHeaderCell
                      onSortChange={this._onSortChange}
                      sortDir={colSortDirs.firstName}>
                      Name
                    </SortHeaderCell>
                    <div className="filter-buffer">
                      <input className="grid-filter" id="name-filter" onChange={(e) => this._onFilterChange(e, 'firstName')} placeholder="Filter by Name"
                      />
                    </div>
                  </div>
                }
                cell={<TextCell data={adjustedDataList} />}
                fixed={true}
                width={rowWidth}
                flexGrow={1}
              />
              <Column
                columnKey="catchPhrase"
                header={
                  <div>
                    <SortHeaderCell
                      onSortChange={this._onSortChange}
                      sortDir={colSortDirs.catchPhrase}>
                      Description
                    </SortHeaderCell>
                    <div className="filter-buffer">
                      <input className="grid-filter" id="description-filter" onChange={(e) => this._onFilterChange(e, 'catchPhrase')} placeholder="Filter by Description"
                      />
                    </div>
                  </div>
                }
                cell={<TextCell data={adjustedDataList} />}
                width={rowWidthAbout}
                flexGrow={columnFlexAbout}
              />
              <Column
                columnKey="words"
                header={
                  <div>
                    <SortHeaderCell
                      onSortChange={this._onSortChange}
                      sortDir={colSortDirs.words}>
                      Notes
                    </SortHeaderCell>
                    <div className="filter-buffer">
                      <input className="grid-filter" id="notes-filter" onChange={(e) => this._onFilterChange(e, 'words')} placeholder="Filter by Notes"
                      />
                    </div>
                  </div>
                }
                cell={<TextCell data={adjustedDataList} />}
                width={rowWidthAbout}
                flexGrow={columnFlexAbout}
              />
            </ColumnGroup>
            <ColumnGroup
              header={
                <Cell>Details &nbsp;
                {
                  !detailsColumnsHidden
                    ? <span onClick={this.toggleDetailsColumnGroup}>[-]</span>
                    : <span onClick={this.toggleDetailsColumnGroup}>[+]</span>
                }
                </Cell>}>
              <Column
                columnKey="percentage"
                header={
                  <div>
                    <SortHeaderCell
                      onSortChange={this._onSortChange}
                      sortDir={colSortDirs.percentage}>
                      % Out-of-Balance
                    </SortHeaderCell>
                    <div id="percentage-filter-container">
                      <select id="percentage-dropdown">
                        <option value="value1" selected>&#62;</option>
                        <option value="value2">=</option>
                        <option value="value3">&#60;</option>
                      </select>
                      <div>
                        <input className="grid-filter" onChange={(e) => this._onFilterChange(e, 'percentage')} type="range" value='0'
                        />
                        <div id="percentage-label">&nbsp;{percentageFilterValue}&nbsp;%</div>
                      </div>
                    </div>
                  </div>
                }
                cell={<TextCell data={adjustedDataList} />}
                width={rowWidth}
                flexGrow={1}
              />
              <Column
                columnKey="value"
                header={
                  <SortHeaderCell
                    onSortChange={this._onSortChange}
                    sortDir={colSortDirs.value}>
                    Market Value
                  </SortHeaderCell>
                }
                cell={<TextCell data={adjustedDataList} />}
                width={rowWidthDetails}
                flexGrow={columnFlexDetails}
              />
            </ColumnGroup>
          </Table>
        </div>
      </div>
    );
  }
}

export default HouseholdsGrid;
