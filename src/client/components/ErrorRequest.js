import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorRequest extends Component {
  static propTypes = {
    error: PropTypes.any
  };

  render() {
    if (!this.props.error) return <span/>;
    return <span className='text-danger m-2'>Error: {this.props.error}</span>;
  }
}

export default ErrorRequest;
