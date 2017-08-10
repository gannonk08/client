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
                <h1>BondLadderPro</h1>
              </Link>
              <div className="header-links">
                <Link to={"/"}>ABOUT &nbsp;&nbsp; |</Link>
                <Link to={"/"}>CONTACT &nbsp;&nbsp; |</Link>
                <Link to={"/"}>&nbsp;&nbsp;LOG IN</Link>
              </div>
            </header>
            <nav>
              <div>
                Log In
              </div>
              <div>
                Imports
              </div>
              <div>
                Clients
              </div>
              <div>
                Rebalance
              </div>
              <div className="header-space"></div>
            </nav>
            <div className="log-in">
              <div className="login-form-container">
                <form>
                  <div className="username">
                    <label for="username">Username</label>
                    <input name="username" type="text"/>
                  </div>
                  <div className="pass">
                    <label for="pass">Password</label>
                    <input name="pass" type="text"/>
                  </div>
                  <div className="buttons">
                    <button className="log-in-button" type="submit">Log In</button>
                    <button className="sign-up-button" type="submit">Sign Up</button>
                  </div>
                </form>
              </div>
              <div className="hero-text">
                <h1>Catchy tagline here...</h1>
                <p>Find out more here</p>
              </div>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

// <Route exact path={"/"} component={AccountList} />
// <Route path={"/accounts/:id"} component={OneAccount} />

export default App;
