import React, {Component} from 'react';
import { Table, Column, Cell } from 'fixed-data-table-2';
import GridStore from './GridStore';
import { CollapseCell, TextCell } from './Cells';
import {StyleSheet, css} from 'aphrodite';
import 'fixed-data-table-2/dist/fixed-data-table.min.css';
import './Grid.css';

import Nav from '../Nav/Nav';
import Header from '../Header/Header';

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollToRow: null,
      collapsedRows: new Set(),
      dataList: new GridStore(2000),
      width: '0',
      height: '0'
    }

    this._handleCollapseClick = this._handleCollapseClick.bind(this);
    this._subRowHeightGetter = this._subRowHeightGetter.bind(this);
    this._rowExpandedGetter = this._rowExpandedGetter.bind(this);
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
    let {dataList, collapsedRows, scrollToRow} = this.state;
    let tableWidth = this.state.width - 20;
    let tableHeight = this.state.height * 0.781;
    let randomPercentage = Math.floor(Math.random() * 99 );
    return (
      <div>
        <Header
          showMenu={true}
        />
        <Nav />
        <div id="grid-container">
          <Table
            scrollToRow={scrollToRow}
            rowHeight={50}
            rowsCount={dataList.getSize()}
            subRowHeightGetter={this._subRowHeightGetter}
            rowExpanded={this._rowExpandedGetter}
            headerHeight={50}
            width={tableWidth}
            height={tableHeight}
            {...this.props}>
            <Column
              cell={<CollapseCell callback={this._handleCollapseClick} collapsedRows={collapsedRows} />}
              fixed={true}
              width={40}
            />
            <Column
              columnKey="firstName"
              header={<Cell>Name</Cell>}
              cell={<TextCell data={dataList} />}
              fixed={true}
              width={150}
            />
            <Column
              columnKey="catchPhrase"
              header={<Cell>Description</Cell>}
              cell={<TextCell data={dataList} />}
              width={300}
            />
            <Column
              columnKey="bs"
              header={<Cell>% Out-of-Balance</Cell>}
              cell={<TextCell data={dataList} />}
              width={200}
            />
            <Column
              columnKey="zipCode"
              header={<Cell>Market Value</Cell>}
              cell={<TextCell data={dataList} />}
              width={200}
            />
            <Column
              columnKey="words"
              header={<Cell>Notes</Cell>}
              cell={<TextCell data={dataList} />}
              width={352}
            />
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
