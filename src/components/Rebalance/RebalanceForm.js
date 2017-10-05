import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import {connector} from '../../redux/userStore';
import {withRouter} from 'react-router-dom';
import Loader from 'react-loader';

let uploadId = '';
let PATH_BASE = '';
let numAccounts = 10;
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
    this.numberWithCommas = this.numberWithCommas.bind(this);
    this.state = { loaded: true };
  }

  componentWillMount() {
    uploadId = localStorage.getItem("uploadId");
  }

  componentDidMount() {
    uploadId = localStorage.getItem("uploadId");
    this.rebalance = PATH_BASE + PATH_REBALANCE + '75';
    uploadId === null || uploadId === undefined
      ? this.rebalance = PATH_BASE + PATH_REBALANCE + '75'
      : this.rebalance = PATH_BASE + PATH_REBALANCE + '75';
  }

  numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  addAccount(record) {
    let rawTotal = record.total;
    let rawTotalNumber = +rawTotal;
    let adjustedTotalNumber = rawTotalNumber.toFixed(0);
    let total = this.numberWithCommas(adjustedTotalNumber);
    let result = {
      type: "account",
      id: numAccounts,
      accountNumber: record.account.account_number,
      total: "$ " + total,
      year: record.year
    };
    rebalanceResult.unshift(result);
    this.props.addAccounts(result);
    numAccounts--;
  }

  onSubmit = (e) => {
    e.preventDefault();
    let quantityRaw = +document.getElementById('rebalance-quantity').value;
    let quantityParsed = parseFloat(Math.round(quantityRaw * 100) / 100).toFixed(2);
    this.setState({ loaded: false });
		let formData = JSON.stringify({
			cusip: document.getElementById('rebalance-cusip').value,
			quantity: quantityParsed,
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
        this.setState({ loaded: true });
        this.props.history.push('/accounts/rebalanced');
			}
		})
		.catch(e => {
			console.log(e);
			this.setState({ loaded: true });
		});
	}

  render() {
    let { loaded } = this.state;
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
              <Loader loaded={loaded}></Loader>
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
