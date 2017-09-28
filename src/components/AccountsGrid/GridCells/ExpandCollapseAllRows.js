import React, {Component} from 'react';
import Tooltip from 'react-tooltip-component';

export class ExpandAllRows extends Component {
  render() {
    return (
      <Tooltip title='Expand All Rows' position='right'>
        <div className="header-tools">
          <img id="group-image" src={require("../images/expandAll.png")} alt="expand all" />
        </div>
      </Tooltip>
    )
  }
}

export class CollapseAllRows extends Component {
  render() {
    return (
      <Tooltip title='Collapse All Rows' position='right'>
        <div className="header-tools">
          <img id="group-image" src={require("../images/collapseAll.png")} alt="collapse all" />
        </div>
      </Tooltip>
    )
  }
}
