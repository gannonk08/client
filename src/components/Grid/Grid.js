import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchHouseholds } from '../../redux/actions/householdsActions';
import { fetchAccounts } from '../../redux/actions/accountsActions';
import Loader from 'react-loader';
import './Grid.css';

import Nav from '../Nav/Nav';
import Header from '../Header/Header';
import HouseholdsGrid from '../HouseholdsGrid/HouseholdsGrid';
import RedirectLogin from './RedirectLogin';

class Grid extends Component {
  constructor(props) {
		super(props);
    this.state = { loaded: false, csvData: "test" };
	}

  componentWillMount() {
    return this.props.dispatchHouseholds(fetchHouseholds())
      .then(res => {
        this.setState({ households: res });
        return this.props.dispatchAccounts(fetchAccounts())
      })
      .then(res => this.setState({ accounts: res, loaded: true }))
      .catch(e => console.log(e));
  }

  render() {
    let { households, accounts, loaded, csvData } = this.state;
    let { importsVisible } = this.props;
    let sessionIndicator;
    let storageSessionIndicator = localStorage.getItem("activeSession");
    storageSessionIndicator === 'true'
      ? sessionIndicator = true
      : sessionIndicator = false;

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
                ? <HouseholdsGrid households={households} accounts={accounts} />
                : <RedirectLogin />
            }
          </div>
        </div>
      </Loader>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    households: state.households,
    accounts: state.accounts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchHouseholds: bindActionCreators(fetchHouseholds, dispatch),
    dispatchAccounts: bindActionCreators(fetchAccounts, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
