import React from 'react';
import './exampleWrapper2.css';

const exampleWrapper2 = ({ WrappedComponent }) => {

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

export default exampleWrapper2;
