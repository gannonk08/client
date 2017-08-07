import React, {Component} from 'react';
import {connector} from '../redux/accountStore';
import Account from './Account';

class AccountList extends Component {
	componentWillMount() {
		fetch('https://barkwire-api.herokuapp.com/dogs')
		.then(res => res.json())
		.then(res => this.props.resetAccounts(res.dogs))
		.catch(err => console.error(err));
	}

	generateAccounts() {
		return this.props.accounts.map(account => (<Account key={account.id} account={account} />));
	}

	render() {
		return (
			<ul className={"accounts"}>
				{this.generateAccounts()}
			</ul>
		);
	}
}

export default connector(AccountList);
