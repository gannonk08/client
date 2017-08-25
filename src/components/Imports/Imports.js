import React, {Component} from 'react';
import './Imports.css';

class Imports extends Component {
	render() {
		return (
      <div>
				<div className="imports">
	        <div className="imports-form-container">
	          <form>
	            <div className="import-loader">
	              <label for="file">Upload a CSV file</label>
	              <input name="file" type="file" />
	              <button type="submit">Import File</button>
	            </div>
	          </form>
	        </div>
	      </div>
			</div>
		)
	}
}

export default Imports;
