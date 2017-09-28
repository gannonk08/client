import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connector} from '../../redux/userStore';
import Loader from 'react-loader';
import './Accounts.css';

import Nav from '../Nav/Nav';
import Header from '../Header/Header';
import AccountsGrid from '../AccountsGrid/AccountsGrid';
import HouseholdsGridStore from '../AccountsGrid/HouseholdsGridStore';
import AccountsGridStore from '../AccountsGrid/AccountsGridStore';

class Accounts extends Component {
  constructor(props) {
		super(props);

    this.getAccountData = this.getAccountData.bind(this);
    this.accounts = [];
    this.state = { loaded: false, data: {}, accountsReceived: true };
	}

  componentWillMount() {
    this.accounts = this.props.accounts;
    this.accounts
      ? this.setState({ accountsReceived: true })
      : this.setState({ accountsReceived: false });
  }

  componentDidMount() {
    this.getAccountData(this.accounts);
  }

  getAccountData(accounts) {
    this.setState({
      data: new AccountsGridStore(accounts),
      loaded: true
    });
  }

  render() {
    let { data, loaded } = this.state;
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
            activeTab={"rebalance"}
            csvData={data._cache}
            importsVisible={importsVisible}
          />
          <div id="grid-container">
            {
              sessionIndicator
                ? <AccountsGrid freshData={data} />
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

export default connector(Accounts);
