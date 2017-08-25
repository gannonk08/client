import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './redux/userStore';

import Authenticate from './components/Authenticate/Authenticate';
import About from './components/About/About';
import Clients from './components/Clients/Clients';
import Footer from './components/Footer/Footer';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path={"/"} component={Authenticate} />
            <Route path={"/about"} component={About} />
            <Route path={"/clients"} component={Clients} />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
