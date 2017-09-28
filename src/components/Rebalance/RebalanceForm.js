import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import {connector} from '../../redux/userStore';
import {withRouter} from 'react-router-dom';

let uploadId = '';
let PATH_BASE = '';
let numAccounts = 1;
process.env.NODE_ENV === 'production'
? PATH_BASE = process.env.REACT_APP_API_PROD
: PATH_BASE = process.env.REACT_APP_API_DEV;

let rebalanceResult = [];

const PATH_REBALANCE = '/rebalance?uploadId=';

class RebalanceForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.addAccount = this.addAccount.bind(this);
  }

  componentWillMount() {
    uploadId = localStorage.getItem("uploadId");
  }

  componentDidMount() {
    uploadId = localStorage.getItem("uploadId");
    this.rebalance = '';
    uploadId === null || uploadId === undefined
      ? this.rebalance = PATH_BASE + PATH_REBALANCE + '72'
      : this.rebalance = PATH_BASE + PATH_REBALANCE + uploadId;
  }

  addAccount(record) {
    let result = {
      type: "account",
      id: numAccounts,
      accountNumber: record.account.account_number,
      total: record.total,
      year: record.year
    };
    rebalanceResult.push(result);
    this.props.addAccounts(result);
    numAccounts++;
  }

  onSubmit = (e) => {
    console.log('this.rebalance', this.rebalance);
    e.preventDefault();
		let formData = JSON.stringify({
			cusip: document.getElementById('rebalance-cusip').value,
			quantity: +document.getElementById('rebalance-quantity').value,
			price: +document.getElementById('rebalance-price').value,
			maturityDate: document.getElementById('rebalance-maturityDate').value
		})

		fetch(this.rebalance, {
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
        let uniqueAccounts = [];
        let records = res.rebalance.slice();

        records.forEach(r => {
          if (!uniqueAccounts.length) {
            uniqueAccounts.unshift(r.account.account_number);
            this.addAccount(r);
          } else {
            let alreadyInArray = false;
            uniqueAccounts.forEach(a => {
              if (r.account.account_number === a) {
                alreadyInArray = true;
              }
            })
            if (!alreadyInArray) {
              uniqueAccounts.unshift(r.account.account_number);
              this.addAccount(r);
            }
          }
        })
        console.log('uniqueAccounts: ', uniqueAccounts);
        console.log('rebalanceResult', rebalanceResult);
        this.props.history.push('/accounts/rebalanced');
			}
		})
		.catch(e => {
			console.log(e);
			this.setState({ loaded: true });
		});
	}

  render() {
		return (
      <Modal {...this.props} bsSize="small" aria-labelledby="contained-modal-title-sm">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-sm">New Secondary Market Offer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div id="add-form-container">
            <div className="rebalance-form">
              <form onSubmit={this.onSubmit}>
                <label htmlFor="cusip">CUSIP</label>
                <input id="rebalance-cusip" type="text" name="cusip" required/>

                <label htmlFor="quantity">Quantity</label>
                <input id="rebalance-quantity" type="number" name="quantity" step=".01" required/>

                <label htmlFor="price">Price</label>
                <input id="rebalance-price" type="number" name="price" step=".01" required/>

                <label htmlFor="maturityDate">Maturity Date</label>
                <input id="rebalance-maturityDate" type="date" name="maturityDate" required/>

                <button type="submit" className="smo btn btn-success">Submit</button>
              </form>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
		)
	}
}

export default withRouter(connector(RebalanceForm));