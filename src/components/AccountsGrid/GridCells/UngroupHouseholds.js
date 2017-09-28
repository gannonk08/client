import React, {Component} from 'react';
import Tooltip from 'react-tooltip-component';

class ToolsColumnGroup extends Component {
  render() {
    return (
      <Tooltip title='Ungroup Households' position='right'>
        <div id="group-image-container">
          <img id="group-image" src={require("../images/ungroup.png")} alt="ungroup" />
        </div>
      </Tooltip>
    )
  }
}

export default ToolsColumnGroup;
