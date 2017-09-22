import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connector} from '../../redux/userStore';
import Loader from 'react-loader';
import './Grid.css';

import Nav from '../Nav/Nav';
import Header from '../Header/Header';
import HouseholdsGrid from '../HouseholdsGrid/HouseholdsGrid';
import HouseholdsGridStore from '../HouseholdsGrid/HouseholdsGridStore';

let PATH_BASE = '';
const PATH_GET_CLIENTS = '/clients?uploadId=';

process.env.NODE_ENV === 'production'
? PATH_BASE = process.env.REACT_APP_API_PROD
: PATH_BASE = process.env.REACT_APP_API_DEV;

class Grid extends Component {
  constructor(props) {
		super(props);

    this.fetchData = this.fetchData.bind(this);
    this.cacheData = this.cacheData.bind(this);

    this.state = { loaded: false, data: {}, };
	}

  componentDidMount() {
    let uploadId = localStorage.getItem("uploadId");
    this.fetchData(uploadId);
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
        this.setState({ data: new HouseholdsGridStore(res.records)});
        return this.state.data;
      }
    })
    .then(data => this.cacheData(data))
    .then(() => this.setState({ loaded: true }))
    .catch(e => console.log(e));
  }

  cacheData(data) {
    let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

    let open = indexedDB.open("BondLadderPro", 1);

    // Create the schema
    open.onupgradeneeded = function() {
        let db = open.result;
        let store = db.createObjectStore("ClientsDataStore", {keyPath: "id"});
        let index = store.createIndex("NameIndex", ["name.last", "name.first"]);
    };

    open.onsuccess = function() {
        // Start a new transaction
        let db = open.result;
        let tx = db.transaction("ClientsDataStore", "readwrite");
        let store = tx.objectStore("ClientsDataStore");
        let index = store.index("NameIndex");

        // Add some data
        store.put({id: 12345, name: {first: "John", last: "Doe"}, age: 42});
        store.put({id: 67890, name: {first: "Bob", last: "Smith"}, age: 35});

        // Query the data
        let getJohn = store.get(12345);
        let getBob = index.get(["Smith", "Bob"]);

        getJohn.onsuccess = function() {
            console.log(getJohn.result.name.first);  // => "John"
        };

        getBob.onsuccess = function() {
            console.log(getBob.result.name.first);   // => "Bob"
        };

        // Close the db when the transaction is done
        tx.oncomplete = function() {
            db.close();
        };
    }
    return data;
  }

  render() {
    let { data, loaded } = this.state;

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
            csvData={this.csvData}
            importsVisible={false}
          />
          <div id="grid-container">
            {
              sessionIndicator
                ? <HouseholdsGrid freshData={data}/>
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

export default connector(Grid);
