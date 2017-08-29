import React, {Component} from 'react';
import './Rebalance.css';

class Rebalance extends Component {
  render() {
    return  (
      <div id="add-form-container">
        <div className="add-form">
          <label htmlFor="cusip">CUSIP</label>
          <input type="number" name="cusip"/>

          <label htmlFor="quantity">Quantity</label>
          <input type="number" name="quantity"/>

          <label htmlFor="price">Price</label>
          <input type="number" name="price"/>

          <button type="submit">Submit</button>
        </div>
      </div>
    );
	}
}

export default Rebalance;
