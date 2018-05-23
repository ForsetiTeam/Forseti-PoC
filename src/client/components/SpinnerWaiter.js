import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';

class SpinnerWaiter extends Component {
  static propTypes = {
    text: PropTypes.string,
    isLoading: PropTypes.bool
  };

  static defaultProps = {
    text: 'Waiting... ',
    isLoading: true
  };

  render() {
    if (!this.props.isLoading) return <span/>;
    return <span><Spinner name='circle' className='d-inline-block button-spinner '/>{this.props.text}</span>;
  }
}

export default SpinnerWaiter;
