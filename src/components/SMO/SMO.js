import React, {Component} from 'react';
import './SMO.css';
import Rebalance from '../Rebalance/Rebalance';

class SMO extends Component {
	constructor(props) {
    super(props);
    this.showAddForm = this.showAddForm.bind(this);
    this.state = {
      addFormVisible: false,
    };
  }

  showAddForm() {
    this.setState({ addFormVisible: !this.state.addFormVisible });
  }

	render() {
    return  (
      <div>
        <div className="rebalance-body">
          <div className="rebalance-nav">
            <div onClick={this.showAddForm} className="smo btn btn-success" data-toggle="modal" data-target="#smo">Secondary Market Offer</div>
          </div>
        </div>
				{
          this.state.addFormVisible
            ? <Rebalance />
            : null
        }
      </div>
    );
	}
}

export default SMO;
