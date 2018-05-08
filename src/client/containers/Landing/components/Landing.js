import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Landing extends Component {
  static propTypes = {
    version: PropTypes.string,
    fetchVersion: PropTypes.func
  };

  componentDidMount() {
    this.props.fetchVersion();
  }

  render() {
    return (
      <div>
        <h3>This is landing</h3>
        <div>Your version is {this.props.version || '...'}</div>
      </div>
    );
  }
}

export default Landing;
