import React, {Component} from 'react';
import './SMO.css';
import Rebalance from '../Rebalance/Rebalance';

class SMO extends Component {
	constructor(props) {
    super(props);
    this.toggleAddForm = this.toggleAddForm.bind(this);
    this.state = {
      addFormVisible: true,
    };
  }

  toggleAddForm() {
    this.setState({ addFormVisible: !this.state.addFormVisible });
  }

	render() {
    return  (
      <div>
        <div className="rebalance-body">
          <div className="rebalance-nav">
						{
		          this.state.addFormVisible
		            ? <Rebalance />
		            : null
		        }
          </div>
        </div>
      </div>
    );
	}
}

export default SMO;
