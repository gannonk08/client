import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './redux/userStore';

import Authenticate from './components/Authenticate/Authenticate';
import About from './components/About/About';
import Grid from './components/Grid/Grid';
import ClientsGrid from './components/ClientsGrid/ClientsGrid';
import Footer from './components/Footer/Footer';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path={"/"} component={Authenticate} />
            <Route exact path={"/about"} component={About} />
            <Route exact path={"/accounts"} component={ClientsGrid} />
            <Route exact path={"/accounts/rebalanced"} component={ClientsGrid} />
            <Route exact path={"/clients"} component={Grid} />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
