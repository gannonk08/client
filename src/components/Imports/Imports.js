import React, {Component} from 'react';
import './Imports.css';
import Nav from '../Nav/Nav';

class Imports extends Component {
	render() {
		return (
      <div>
				<Nav
					imports="active-tab"
					clients="inactive-tab"
					rebalance="inactive-tab"
				/>
				<div className="imports">
	        <div className="imports-form-container">
	          <form>
	            <div className="import-loader">
	              <label for="file">Upload Files</label>
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