import React, {Component} from 'react';
import './Rebalance.css';

let PATH_BASE = '';
process.env.NODE_ENV === 'production'
? PATH_BASE = process.env.REACT_APP_API_PROD
: PATH_BASE = process.env.REACT_APP_API_DEV;

const PATH_REBALANCE = '/rebalance';

class Rebalance extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
		let formData = JSON.stringify({
			cusip: document.getElementById('rebalance-cusip').value,
			quantity: document.getElementById('rebalance-quantity').value,
			price: document.getElementById('rebalance-price').value,
			maturityDate: document.getElementById('rebalance-maturityDate').value
		})

		fetch(PATH_BASE + PATH_REBALANCE, {
			mode: 'cors',
			credentials: 'include',
		  method: 'POST',
			headers: {
				'Access-Control-Allow-Origin': '*',
		    'Accept': '*/*',
		    'Content-Type': 'application/json'
		  },
		  body: formData
		})
		.then(response => response.json())
		.then(res => {
			if (res.status === "OK") {
				console.log('rebalance response is OK!!');
				this.props.history.push('/accounts/rebalanced');
				this.props.addUserEmail(res.record.email);
			}
		})
		.catch(e => {
			console.log(e);
			this.setState({ loaded: true });
		});
	}

  render() {
    return  (
      <div id="add-form-container">
        <div className="rebalance-form">
          <form onSubmit={this.onSubmit}>
            <label htmlFor="cusip">CUSIP</label>
            <input id="rebalance-cusip" type="text" name="cusip"/>

            <label htmlFor="quantity">Quantity</label>
            <input id="rebalance-quantity" type="number" name="quantity"/>

            <label htmlFor="price">Price</label>
            <input id="rebalance-price" type="number" name="price"/>

            <label htmlFor="maturityDate">Maturity Date</label>
            <input id="rebalance-maturityDate" type="date" name="maturityDate"/>

            <button type="submit" className="btn btn-success">Submit</button>
          </form>
        </div>
      </div>
    );
	}
}

export default Rebalance;
