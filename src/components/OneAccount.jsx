import React, {Component} from 'react';
import {connector} from '../redux/accountStore';
import Account from './Account';

class OneAccount extends Component {
	generateAccount() {
		const id = Number(this.props.match.params.id)
		const account = this.getAccountFromStore(id);

		if(!account) {
			this.getAccountFromApi(id);
			return "Fetching account";
		} else {
			return (<Account account={account} />);
		}
	}

	getAccountFromStore(id) {
		const accounts = this.props.accounts.filter(account => account.id === id);

		return accounts[0];
	}

	getAccountFromApi(id) {
		fetch(`https://barkwire-api.herokuapp.com/dogs/${id}`)
		.then(res => res.json())
		.then(res => this.props.addOneAccount(res.dog))
		.catch(err => console.error(err));
	}

	render() {
		return (
			<ul className={"accounts"}>
				{this.generateAccount()}
			</ul>
		)
	}
}

export default connector(OneAccount);
