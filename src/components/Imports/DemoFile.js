import React, {Component} from 'react';
import {connector} from '../../redux/store';
import {withRouter} from 'react-router-dom';
import Loader from 'react-loader';
import AWS from 'aws-sdk';
import './Imports.css';

AWS.config.region = process.env.REACT_APP_REGION;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: process.env.REACT_APP_POOL_ID,
});
AWS.config.credentials.get(() => {
  // eslint-disable-next-line
  const accessKeyId = AWS.config.credentials.accessKeyId;
  // eslint-disable-next-line
  const secretAccessKey = AWS.config.credentials.secretAccessKey;
  // eslint-disable-next-line
  const sessionToken = AWS.config.credentials.sessionToken;
});
// eslint-disable-next-line
const identityId = AWS.config.credentials.identityId;
const s3 = new AWS.S3({apiVersion: '2006-03-01'});

class DemoFile extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = { loaded: true };
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ loaded: false });
		let fileAcl = process.env.REACT_APP_ACL;
		let bucketName = process.env.REACT_APP_BUCKET_NAME;
		let file = require('./demo.csv');
		let fileName = 'formattedDates.csv';
		let filePath = 'csv/';
  	let fileKey = filePath + fileName;

		const params = {
		  ACL: fileAcl,
		  Body: file,
		  Bucket: bucketName,
		  Key: fileKey
		 };
		return s3.upload(params, (err, data) => {
			if (err) {
				console.log(err, err.stack)
			} else {
        let PATH_BASE = '';
        process.env.NODE_ENV === 'production'
        ? PATH_BASE = process.env.REACT_APP_API_PROD
        : PATH_BASE = process.env.REACT_APP_API_DEV;

		    const PATH_CLIENTS = '/clients/import?fileName=';
		    fetch(PATH_BASE + PATH_CLIENTS + fileName, {
					mode: 'cors',
		      credentials: 'include',
				  method: 'GET',
					headers: { 'Accept': 'application/json' }
				})
        .then (res => res.json())
				.then(res => {
					if (res.status === 'OK') {
            let uploadId = res.uploadId;
            localStorage.setItem("uploadId", uploadId);
            const PATH_GET_CLIENTS = '/clients?uploadId=';
            fetch(PATH_BASE + PATH_GET_CLIENTS + uploadId, {
    					mode: 'cors',
    		      credentials: 'include',
    				  method: 'GET',
    					headers: { 'Accept': 'application/json' }
    				})
            .then (res => res.json())
            .then(res => {
              if (res.status === "OK") {
                this.setState({ loaded: true });
                document.getElementById("importsVisible").className = "false";
                document.getElementById("importsNav").className = "false";
                this.props.onHide();
                this.props.history.push('/clients');
              }
            })
            .catch(e => {
              console.log(e);
              this.setState({ loaded: true });
              this.props.history.push('/clients/import');
            });
					}
				})
				.catch(e => console.log(e));
			}
		});
	}

  render() {
    let { loaded } = this.state;
		return (
      <div className="imports">
        <Loader loaded={loaded}>
          <div className="imports-form-container">
            <form onSubmit={this.onSubmit}>
              <div className="import-loader">
                <label>Upload a Demo file</label>
                <label id="demoFile">demo.csv</label>
                <button type="submit">Import File</button>
              </div>
            </form>
          </div>
        </Loader>
      </div>
		)
	}
}

export default withRouter(DemoFile);
