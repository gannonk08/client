import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
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

class Imports extends Component {
	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
	}

  onSubmit = (e) => {
    e.preventDefault();
		let fileAcl = process.env.REACT_APP_ACL;
		let bucketName = process.env.REACT_APP_BUCKET_NAME;
		let fileInput = document.getElementById('fileInput');
		let file = fileInput.files[0];
		let fileName = file.name;
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
				console.log("DATA: ", data);
        let PATH_BASE = '';
        process.env.NODE_ENV === 'production'
        ? PATH_BASE = process.env.REACT_APP_API_PROD
        : PATH_BASE = process.env.REACT_APP_API_DEV;

		    const PATH_CLIENTS = '/clients/import?fileName=sampleCSV.csv';
		    fetch(PATH_BASE + PATH_CLIENTS, {
					mode: 'cors',
		      credentials: 'include',
				  method: 'GET',
					headers: { 'Accept': 'application/json' }
				})
				.then(res => {
					if (res.ok === true) {
						console.log("res.ok === true");
            const PATH_GET_IMPORTS = '/clients/dumby';
            fetch(PATH_BASE + PATH_GET_IMPORTS, {
    					mode: 'cors',
    		      credentials: 'include',
    				  method: 'GET',
    					headers: { 'Accept': 'application/json' }
    				})
            .then (res => res.json())
            .then(res => {
              if (res.status === "OK") {
                console.log("dumby data: ", res.records);
                this.props.history.push('/clients');
              }
            })
            .catch(e => console.log(e));
					}
				})
				.catch(e => console.log(e));
			}
		});
  }

	render() {
		return (
      <div>
				<div className="imports">
	        <div className="imports-form-container">
	          <form onSubmit={this.onSubmit}>
	            <div className="import-loader">
	              <label htmlFor="file">Upload a CSV file</label>
	              <input name="file" type="file" id="fileInput"/>
	              <button type="submit">Import File</button>
	            </div>
	          </form>
	        </div>
	      </div>
			</div>
		)
	}
}

export default withRouter(Imports);
