import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import UploadFile from './UploadFile';
import DemoFile from './DemoFile';
import './Imports.css';

export default class ImportsForm extends Component {
  constructor(props) {
    super(props);
    this.state = { uploadFileActive: false };
    this.toggleTab = this.toggleTab.bind(this);
  }

  toggleTab() {
    this.setState({ uploadFileActive: !this.state.uploadFileActive });
  }

  render() {
    let { uploadFileActive } = this.state;
		return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Import Client Securities</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div id="uploadTabs">
            <div onClick={this.toggleTab} className={!uploadFileActive}>
              <button>Demo File</button>
            </div>
            <div onClick={this.toggleTab} className={uploadFileActive}>
              <button>Upload File</button>
            </div>
          </div>
          {
            uploadFileActive
              ? <UploadFile activeTab={true} onHide={this.props.onHide}/>
              : <DemoFile activeTab={true} onHide={this.props.onHide} />
          }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
		)
	}
}
