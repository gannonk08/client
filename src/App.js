import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { render } from 'react-dom';
import {Provider} from 'react-redux';
import {store} from './redux/userStore';

import Authenticate from './components/Authenticate/Authenticate';
import About from './components/About/About';
import Grid from './components/Grid/Grid';
import ClientsGrid from './components/ClientsGrid/ClientsGrid';
import ClientsImport from './components/ClientsImport/ClientsImport';
import Footer from './components/Footer/Footer';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path={"/"} component={Authenticate} />
            <Route exact path={"/about"} component={About} />
            <Route exact path={"/accounts/rebalanced"} component={ClientsGrid} />
            <Route exact path={"/accounts"} component={ClientsGrid} />
            <Route
              exact path={"/clients/import"}
              render={(props) => <ClientsImport {...props} uploadIdExists={false}/>} />
            <Route
              exact path={"/clients"}
              render={(props) => <Grid {...props} importsVisible={false}/>} />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
