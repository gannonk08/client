import React, {Component} from 'react';
import './Rebalance.css';

class Rebalance extends Component {
  render() {
    return  (
      <div className="add-form">
        <label for="cusip">CUSIP</label>
        <input type="number" name="cusip"/>
        <label for="quantity">Quantity</label>
        <input type="number" name="quantity"/>
        <label for="price">Price</label>
        <input type="number" name="price"/>
        <button type="submit" className="btn btn-primary">Submit</button>
      </div>
    );
	}
}

export default Rebalance;
