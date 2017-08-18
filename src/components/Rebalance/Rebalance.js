import React from 'react';
import exampleWrapper2 from './exampleWrapper2';
import './Rebalance.css';
import Nav from '../Nav/Nav';

// eslint-disable-next-line
const Example2 = React.createClass({
  getInitialState() {
    this._columns = [
      {
        key: 'id',
        name: 'ID',
        width: 25,
        locked: true
      },
      {
        key: 'name',
        name: 'Client Household',
        width: 160,
        sortable: true
      },
      {
        key: 'account',
        name: 'Client Account',
        width: 160,
        sortable: true
      },
      {
        key: 'description',
        name: 'Description',
        width: 160,
        sortable: true
      },
      {
        key: '2017',
        name: '2017',
        width: 160,
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

  getRandomDescription(num) {
    const descrArray = ['TIC', 'IRA', 'IRA RO', 'SEP IRA', 'Gary & Cristie'];
    return descrArray[num];
  },

  createRows() {
    let rows = [];
    for (let i = 1; i < 50; i++) {
      rows.push({
        id: '+',
        name: 'Client ' + i,
        account: '#' + Math.min(100000, Math.round(Math.random() * 110000)),
        description: this.getRandomDescription(Math.floor(Math.random() * 5)),
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
      <div>
        <Nav
          imports="inactive-tab"
          clients="inactive-tab"
          rebalance="active-tab"
        />
        <div className="rebalance-body">
          <div className="rebalance-nav">
            <div className="date-today">15-Aug-2017</div>
            <button className="smo btn btn-success" type="button" data-toggle="modal" data-target="#smo">Secondary Market Offer</button>
          </div>
          <div className="add-form">
            <label for="cusip">CUSIP</label>
            <input type="number" name="cusip"/>
            <label for="quantity">Quantity</label>
            <input type="number" name="quantity"/>
            <label for="price">Price</label>
            <input type="number" name="price"/>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </div>
      </div>
    );
  }
});

export default exampleWrapper2({
  WrappedComponent: Example2,
  exampleName: 'Sortable Columns Example',
  examplePath: './scripts/example08-sortable-cols.js',
  examplePlaygroundLink: 'https://jsfiddle.net/k7tfnw1n/8/'
});
