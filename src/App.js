import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import AccountList from './components/AccountList';
import {Provider} from 'react-redux';
import {store} from './redux/accountStore';
import OneAccount from './components/OneAccount';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <header>
              <Link to={"/"}>
                <h1>BondPro</h1>
              </Link>
            </header>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
