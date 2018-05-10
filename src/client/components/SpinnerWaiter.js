import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';

class SpinnerWaiter extends Component {
  static propTypes = {
    isLoading: PropTypes.bool
  };

  render() {
    if (!this.props.isLoading) return <span/>;
    return <span><Spinner name='circle' className='d-inline-block button-spinner '/>Waiting... </span>;
  }
}

export default SpinnerWaiter;
