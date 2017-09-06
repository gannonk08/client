import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import AWS from 'aws-sdk';
import './Imports.css';

AWS.config.region = 'us-west-2';
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: '***REMOVED***',
});
AWS.config.credentials.get(() => {
  const accessKeyId = AWS.config.credentials.accessKeyId;
  const secretAccessKey = AWS.config.credentials.secretAccessKey;
  const sessionToken = AWS.config.credentials.sessionToken;
});
const identityId = AWS.config.credentials.identityId;
const s3 = new AWS.S3({apiVersion: '2006-03-01'});

class Imports extends Component {
	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
	}

  onSubmit = (e) => {
    e.preventDefault();
		let fileAcl = 'public-read-write';
		let bucketName = 'bondladderpro';
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
				const PATH_BASE = "https://bondladderpro-v1.herokuapp.com";
		    const PATH_CLIENTS = '/clients/import?fileName=sampleCSV.csv';
		    fetch(PATH_BASE + PATH_CLIENTS, {
					mode: 'cors',
		      credentials: 'include',
				  method: 'GET',
					headers: {
				    'Accept': '*/*',
				    'Content-Type': 'application/json'
				  }
				})
				.then(res => {
					console.log("un-parsed response: ", res);
					if (res.ok === true) {
						console.log("res.ok === true");
						this.props.history.push('/clients');
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
