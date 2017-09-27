import { Cell } from 'fixed-data-table-2';
import React from 'react';
import Tooltip from 'react-tooltip-component';

const SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC',
};

function reverseSortDirection(sortDir) {
  return sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC;
}

export class SortHeaderCell extends React.Component {
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
};

export class CollapseCell extends React.PureComponent {
  render() {
    const {data, rowIndex, columnKey, collapsedRows, callback, ...props} = this.props;
    console.log("CollapseCell DATA !!", data[rowIndex]);
    let rowType = data[rowIndex].type;
    let rowId = data[rowIndex].id;

    let headerTooltip = '';
    if (rowType === 'header') {
      let numAccounts = data[rowIndex - 1].accounts.length
      numAccounts > 1
        ? headerTooltip = numAccounts + " accounts, " + 1 + " securities"
        : headerTooltip = numAccounts + " account, " + 1 + " securities";
    }

    return (
      <div>
      {
        rowType === "household"
          ? <Cell {...props}>
              <a onClick={() => callback(rowIndex)}>
                {collapsedRows.has(rowIndex) ? '\u25BC' : '\u25BA'}
              </a>
            </Cell>
          : <Cell>{rowId}</Cell>
      }
      {
        rowType === "header"
          ? <div className="sub-header">
              <Cell>
                <Tooltip title={headerTooltip} position='right'>
                  <div className="info-image">
                    <img id="info" src={require("../../HouseholdsGrid/images/info.png")} alt="info" />
                  </div>
                </Tooltip>
              </Cell>
            </div>
          : <Cell></Cell>
      }
      </div>
    );
  }
};

export class ColoredTextCell extends React.PureComponent {
  render() {
    const {data, rowIndex, columnKey, ...props} = this.props;
    return (
      <Cell {...props}>
        {this.colorizeText(data.getObjectAt(rowIndex)[columnKey], rowIndex)}
      </Cell>
    );
  }

  colorizeText(str, index) {
    let val, n = 0;
    return str.split('').map((letter) => {
      val = index * 70 + n++;
      let color = 'hsl(' + val + ', 100%, 50%)';
      return <span style={{color}} key={val}>{letter}</span>;
    });
  }
};

export class DateCell extends React.PureComponent {
  render() {
    const {data, rowIndex, columnKey, ...props} = this.props;
    return (
      <Cell {...props}>
        {data.getObjectAt(rowIndex)[columnKey].toLocaleString()}
      </Cell>
    );
  }
};

export class LinkCell extends React.PureComponent {
  render() {
    const {data, rowIndex, columnKey, ...props} = this.props;
    return (
      <Cell {...props}>
        <a href="/">{data.getObjectAt(rowIndex)[columnKey]}</a>
      </Cell>
    );
  }
};

export class PendingCell extends React.PureComponent {
  render() {
    const {data, rowIndex, columnKey, dataVersion, ...props} = this.props;
    const rowObject = data.getObjectAt(rowIndex);
    return (
      <Cell {...props}>
        {rowObject ? rowObject[columnKey] : 'pending'}
      </Cell>
    );
  }
};

export class RemovableHeaderCell extends React.PureComponent {
  render() {
    const {data, rowIndex, columnKey, callback, children, ...props} = this.props;
    return (
      <Cell {...props}>
        {children}
        <a style={{float: 'right'}} onClick={() => callback(columnKey)}>
          {'\u274C'}
        </a>
      </Cell>
    );
  }
};

export class TextCell extends React.PureComponent {
  render() {
    const {data, rowIndex, columnKey, ...props} = this.props;
    return (
      <Cell {...props}>
        {data.getObjectAt(rowIndex)[columnKey]}
      </Cell>
    );
  }
};
