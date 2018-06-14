import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EtherscanLink extends Component {
  static propTypes = {
    address: PropTypes.string
  };

  render() {
    const url = `https://rinkeby.etherscan.io/address/${this.props.address}`;

    return <a href={url} target='_blank'>{this.props.address}</a>;
  }
}

export default EtherscanLink;
