import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './redux/accountStore';
import Login from './components/Login/Login';
import Imports from './components/Imports/Imports';
import Nav from './components/Nav/Nav';
import Clients from './components/Clients/Clients';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Nav />
            <Route exact path={"/"} component={Login} />
            <Route path={"/imports"} component={Imports} />
            <Route path={"/clients"} component={Clients} />
            <Route path={"/rebalance"} component={Clients} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
