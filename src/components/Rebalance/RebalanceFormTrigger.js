import React, {Component} from 'react';
import RebalanceForm from './RebalanceForm';
import './Rebalance.css';
import Tooltip from 'react-tooltip-component';

export default class RebalanceFormTrigger extends Component {
  constructor(props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);

    this.state = {
      showModal: false,
      rebalanceToolsVisible: false,
      rebalanceImageSrc: 'rebalance.png',
    };
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal,
      rebalanceToolsVisible: !this.state.rebalanceToolsVisible
    });
  }

  mouseEnter() {
    this.setState({ rebalanceImageSrc: 'rebalance-flipped.png'});
  }

  mouseLeave() {
    this.setState({ rebalanceImageSrc: 'rebalance.png'});
  }

  render() {
    let { showModal, rebalanceToolsVisible, rebalanceImageSrc } = this.state;

		return (
      <div id="rebalanceNav" className={rebalanceToolsVisible} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
        <Tooltip title='Rebalance Accounts' position='top'>
          <img className="nav-image" onClick={this.toggleModal} src={require('./images/' + rebalanceImageSrc)} alt="rebalance"/>
        </Tooltip>
        <RebalanceForm show={showModal} onHide={this.toggleModal} />
      </div>
		)
	}
}
