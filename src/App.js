import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import About from './components/About/About';
import Imports from './components/Imports/Imports';
import Header from './components/Header/Header';
import Clients from './components/Clients/Clients';
import Rebalance from './components/Rebalance/Rebalance';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route exact path={"/"} component={Login} />
          <Route path={"/signup"} component={Signup} />
          <Route path={"/about"} component={About} />
          <Route path={"/imports"} component={Imports} />
          <Route path={"/clients"} component={Clients} />
          <Route path={"/rebalance"} component={Rebalance} />
        </div>
      </Router>
    );
  }
}

export default App;
