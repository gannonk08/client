import React from 'react';
import './exampleWrapper.css';

const exampleWrapper = ({ WrappedComponent }) => {

  // eslint-disable-next-line
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
