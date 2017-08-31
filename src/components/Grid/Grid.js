import React, {Component} from 'react';
import { Table, Column, ColumnGroup, Cell } from 'fixed-data-table-2';
import GridStore from './GridStore';
import { CollapseCell, ImageCell, TextCell } from './Cells';
import {StyleSheet, css} from 'aphrodite';
import 'fixed-data-table-2/dist/fixed-data-table.min.css';
import './Grid.css';

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

    this._dataList = new GridStore(2000);

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

    this._handleCollapseClick = this._handleCollapseClick.bind(this);
    this._subRowHeightGetter = this._subRowHeightGetter.bind(this);
    this._rowExpandedGetter = this._rowExpandedGetter.bind(this);
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
    let updatedPercentageValue = document.getElementById('filter-percentage').value;
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

    const style = {
      height: height,
      width: width - 2,
    };
    return (
      <div style={style}>
        <div className={css(styles.expandStyles)}>
            expanded content
        </div>
      </div>
    );
  }

  render() {
    let {percentageFilterValue, adjustedDataList, colSortDirs, collapsedRows, scrollToRow} = this.state;
    let tableWidth = this.state.width - 10;
    let tableHeight = this.state.height * 0.781;
    return (
      <div>
        <Header
          showMenu={true}
        />
        <Nav />
        <div id="grid-container">
          <div id="grid-filters">
            <input className="filter-grid" id="filter-name" onChange={(e) => this._onFilterChange(e, 'firstName')} placeholder="Filter by Name"
            />
            <input className="filter-grid" id="filter-description" onChange={(e) => this._onFilterChange(e, 'catchPhrase')} placeholder="Filter by Description"
            />
            <input className="filter-grid" id="filter-notes" onChange={(e) => this._onFilterChange(e, 'words')} placeholder="Filter by Notes"
            />
            <div id="filter-percentage-container">
              <div>
                <div id="greater-than">&#62;</div>
                <div id="equal-to">=</div>
                <div id="less-than">&#60;</div>
              </div>
              <div>
                <input className="filter-grid" id="filter-percentage" onChange={(e) => this._onFilterChange(e, 'percentage')} type="range"
                />
                <div id="percentage-label">{percentageFilterValue}&nbsp;%</div>
              </div>
            </div>
          </div>
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
              header={<Cell>About</Cell>}>
              <Column
                columnKey="firstName"
                header={
                  <SortHeaderCell
                    onSortChange={this._onSortChange}
                    sortDir={colSortDirs.firstName}>
                    Name
                  </SortHeaderCell>
                }
                cell={<TextCell data={adjustedDataList} />}
                fixed={true}
                width={200}
                flexGrow={1}
              />
              <Column
                columnKey="catchPhrase"
                header={
                  <SortHeaderCell
                    onSortChange={this._onSortChange}
                    sortDir={colSortDirs.catchPhrase}>
                    Description
                  </SortHeaderCell>
                }
                cell={<TextCell data={adjustedDataList} />}
                width={300}
                flexGrow={1}
              />
              <Column
                columnKey="words"
                header={
                  <SortHeaderCell
                    onSortChange={this._onSortChange}
                    sortDir={colSortDirs.words}>
                    Notes
                  </SortHeaderCell>
                }
                cell={<TextCell data={adjustedDataList} />}
                width={300}
                flexGrow={1}
              />
            </ColumnGroup>
            <ColumnGroup
              header={<Cell>Details</Cell>}>
              <Column
                columnKey="percentage"
                header={
                  <SortHeaderCell
                    onSortChange={this._onSortChange}
                    sortDir={colSortDirs.percentage}>
                    % Out-of-Balance
                  </SortHeaderCell>
                }
                cell={<TextCell data={adjustedDataList} />}
                width={200}
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
                width={200}
                flexGrow={1}
              />
            </ColumnGroup>
          </Table>
        </div>
      </div>
    );
  }
}

const styles = StyleSheet.create({
 expandStyles: {
    'background-color': 'white',
    'box-sizing': 'border-box',
    border: '1px solid #d3d3d3',
    padding: '20px',
    overflow: 'hidden',
    width: '100%',
    height: '100%'
  }
});

export default Grid;
