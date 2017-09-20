import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Tooltip from 'react-tooltip-component';

class ToolsColumnGroup extends Component {
  render() {
    return (
      <Tooltip title='Ungroup Households' position='right'>
        <div id="group-image-container">
          <Link to={"/accounts"}>
            <img id="group-image" src={require("../images/ungroup.png")} alt="ungroup" />
          </Link>
        </div>
      </Tooltip>
    )
  }
}

export default ToolsColumnGroup;
