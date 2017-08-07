import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Account extends Component {
	render() {
		return (
			<li>
				<Link to={`/accounts/${this.props.account.id}`}>
					<section className={"account-listing"}>
						<h3 className={"name"}>{this.props.account.name}</h3>
						<section>
							<figure>
								<img src={this.props.account.imageUrl} alt={this.props.account.name} />
								<figcaption>{this.props.account.imageCaption}</figcaption>
							</figure>
							<p>{this.props.account.description}</p>
						</section>
					</section>
				</Link>
			</li>
		);
	}
}

export default Account;
