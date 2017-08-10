import React from 'react';
import ReactDataGrid from 'react-data-grid';
import exampleWrapper from './exampleWrapper';

const Example = React.createClass({
  getInitialState() {
    this._columns = [
      {
        key: 'id',
        name: 'ID',
        locked: true
      },
      {
        key: 'name',
        name: 'Client Household Name',
        width: 150,
        sortable: true
      },
      {
        key: 'account',
        name: 'Client Account Number',
        width: 150,
        sortable: true
      },
      {
        key: '2017',
        name: '2017',
        width: 150,
        sortable: true
      },
      {
        key: '2018',
        name: '2018',
        width: 150,
        sortable: true
      },
      {
        key: '2019',
        name: '2019',
        width: 150,
        sortable: true
      },
      {
        key: '2020',
        name: '2020',
        width: 150,
        sortable: true
      },
      {
        key: '2021',
        name: '2021',
        width: 150,
        sortable: true
      },
      {
        key: '2022',
        name: '2022',
        width: 150,
        sortable: true
      }
    ];

    let originalRows = this.createRows(50);
    let rows = originalRows.slice(0);
    // Store the original rows array, and make a copy that can be used for modifying eg.filtering, sorting
    return { originalRows, rows };
  },

  getRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
  },

  createRows() {
    let rows = [];
    for (let i = 1; i < 50; i++) {
      rows.push({
        id: '+',
        name: 'Client ' + i,
        account: '#' + Math.min(100000, Math.round(Math.random() * 110000)),
        2017: '$ ' + Math.min(100000, Math.round(Math.random() * 110000)),
        2018: '$ ' + Math.min(100000, Math.round(Math.random() * 110000)),
        2019: '$ ' + Math.min(100000, Math.round(Math.random() * 110000)),
        2020: '$ ' + Math.min(100000, Math.round(Math.random() * 110000)),
        2021: '$ ' + Math.min(100000, Math.round(Math.random() * 110000)),
        2022: '$ ' + Math.min(100000, Math.round(Math.random() * 110000))
      });
    }

    return rows;
  },

  handleGridSort(sortColumn, sortDirection) {
    const comparer = (a, b) => {
      if (sortDirection === 'ASC') {
        return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
      } else if (sortDirection === 'DESC') {
        return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
      }
    };

    const rows = sortDirection === 'NONE' ? this.state.originalRows.slice(0) : this.state.rows.sort(comparer);

    this.setState({ rows });
  },

  rowGetter(i) {
    return this.state.rows[i];
  },

  render() {
    return  (
      <ReactDataGrid
        onGridSort={this.handleGridSort}
        columns={this._columns}
        rowGetter={this.rowGetter}
        rowsCount={this.state.rows.length} />);
  }
});

export default exampleWrapper({
  WrappedComponent: Example,
  exampleName: 'Sortable Columns Example',
  examplePath: './scripts/example08-sortable-cols.js',
  examplePlaygroundLink: 'https://jsfiddle.net/k7tfnw1n/8/'
});
