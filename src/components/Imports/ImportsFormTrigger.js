import React, {Component} from 'react';
import ImportsForm from './ImportsForm';
import './Imports.css';
import Tooltip from 'react-tooltip-component';

export default class ImportsFormTrigger extends Component {
  constructor(props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
    this.state = { importsVisible: this.props.importsVisible };
  }

  toggleModal() {
    this.setState({ importsVisible: !this.state.importsVisible });
  }

  render() {
    let { importsVisible } = this.state;

		return (
      <div id="importsNav" className={importsVisible}>
        <Tooltip title='Import Client Securities' position='top'>
          <img className="nav-image" onClick={this.toggleModal} src={require('./images/imports.png')} alt="imports"/>
        </Tooltip>
        <div id="importsVisible" className={importsVisible}>
          <ImportsForm show={importsVisible} onHide={this.toggleModal} />
        </div>
      </div>
		)
	}
}
