import React, {Component} from 'react';
import Tooltip from 'react-tooltip-component';

export class HideFilters extends Component {
  render() {
    return (
      <Tooltip title='Hide Filters' position='right'>
        <div className="header-tools">
          <img id="group-image" src={require("../images/hideFilters.png")} alt="hide filters" />
        </div>
      </Tooltip>
    )
  }
}

export class ShowFilters extends Component {
  render() {
    return (
      <Tooltip title='Show Filters' position='right'>
        <div className="header-tools">
          <img id="group-image" src={require("../images/showFilters.png")} alt="show filters" />
        </div>
      </Tooltip>
    )
  }
}
