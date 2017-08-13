import React, {Component} from 'react';

class Imports extends Component {
	render() {
		return (
      <div className="imports">
        <div className="imports-form-container">
          <form>
            <div className="import-loader">
              <label for="file">Upload Files</label>
              <input name="file" type="file" />
              <button type="submit">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
		)
	}
}

export default Imports;
