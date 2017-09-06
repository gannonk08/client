import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import AWS from 'aws-sdk';
import './Imports.css';
import 'dotenv';

// const PATH_S3 = "https://d3iq86bw2i3xr0.cloudfront.net/csv/sampleCSV.csv";

class Imports extends Component {
	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
	}

  onSubmit = (e) => {
    e.preventDefault();

		let myConfig = new AWS.Config();
		myConfig.update({ accessKeyId: 'AKIAIWN5F5MZGYFC5CZA', secretAccessKey: '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', region: 'us-west-2' });
		const s3 = new AWS.S3({apiVersion: '2006-03-01'});

		let fileInput = document.getElementById('fileInput');
		let fileBody = fileInput.files[0];
		console.log('file on submit: ', fileBody);

		const params = {
		  ACL: 'public-read-write',
		  Body: fileBody,
		  Bucket: 'bondladderpro',
		  Key: 'build/csv/sampleCSV.csv'
		 };
		return s3.upload(params, (err, data) => {
			console.log("data: ", data);
			console.log("err: ", err);
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
						'Access-Control-Allow-Origin': '*',
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
