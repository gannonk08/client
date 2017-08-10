import React from 'react';
import classNames from 'classnames';
import './exampleWrapper.css';

const emptyAction = () => { };
const disableLink = (e) => e.stopPropagation();

const exampleWrapper = ({ WrappedComponent }) => {

  return React.createClass({
    render() {
      return (
        <div>
          <WrappedComponent />
        </div>
      );
    }
  });
};

export default exampleWrapper;
