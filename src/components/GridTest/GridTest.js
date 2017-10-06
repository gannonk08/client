import React, {Component} from 'react';
import {Link} from 'react-router-dom';
// import {connector} from '../../redux/userStore';
import Loader from 'react-loader';
import './GridTest.css';

import Nav from '../Nav/Nav';
import Header from '../Header/Header';
import TestGrid from '../TestGrid/TestGrid';
import TestGridStore from '../TestGrid/TestGridStore';
import TestAccountsGridStore from '../TestGrid/TestAccountsGridStore';

let PATH_BASE = '';
const PATH_GET_CLIENTS = '/clients?uploadId=';

process.env.NODE_ENV === 'production'
? PATH_BASE = process.env.REACT_APP_API_PROD
: PATH_BASE = process.env.REACT_APP_API_DEV;

class Grid extends Component {
  constructor(props) {
		super(props);

    this.fetchData = this.fetchData.bind(this);
    this.uploadId = 0;
    this.state = { loaded: false, data: {}, };
	}

  componentWillMount() {
    this.uploadId = localStorage.getItem("uploadId");
  }

  componentDidMount() {
    this.fetchData(this.uploadId);
  }

  fetchData(uploadId) {
    fetch(PATH_BASE + PATH_GET_CLIENTS + uploadId, {
      mode: 'cors',
      credentials: 'include',
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    })
    .then (res => res.json())
    .then(res => {
      if (res.status === "OK") {
        this.setState({ data: new TestGridStore(res.records)});

        let accountsArray = this.state.data._cache;
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
        let newCsvData = new TestAccountsGridStore(result);
        this.setState({
          csvData: newCsvData._cache,
          loaded: true
        });
      }
    })
    .catch(e => console.log(e));
  }

  render() {
    let { data, loaded, csvData } = this.state;
    let { importsVisible } = this.props;
    let sessionIndicator;
    let storageSessionIndicator = localStorage.getItem("activeSession");
    if (storageSessionIndicator === 'true') {
      sessionIndicator = true;
    } else {
      sessionIndicator = false;
    }

    return (
      <Loader loaded={loaded}>
        <div>
          <Header
            showMenu={true}
          />
          <Nav
            groupByHousehold={true}
            csvData={csvData}
            importsVisible={importsVisible}
          />
          <div id="grid-container">
            {
              sessionIndicator
                ? <TestGrid freshData={data} />
                :
                <div>
                  <p id="redirect-login-paragraph"><Link to={"/"} id="redirect-login">You must be logged in to view this page. Click here to log in.</Link></p>
                </div>

            }
          </div>
        </div>
      </Loader>
    );
  }
}

export default Grid;
