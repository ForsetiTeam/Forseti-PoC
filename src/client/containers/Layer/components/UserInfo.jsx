import React, { Component } from 'react';
import PropTypes from 'prop-types';

const numeral = require('numeral');

class UserInfo extends Component {
  static propTypes = {
    balanceEth: PropTypes.number,
    balanceFrs: PropTypes.number,
    conversion: PropTypes.number,
    account: PropTypes.string
  };

  renderBalance(amount, currency, conversion) {
    if (!amount && amount !== 0) return;
    return (
      <div className='text-right m-2 d-none d-lg-block text-muted'>
        <div className='text-nowrap UserInfo__balance'>
          <span className='text-primary mr-1'>{numeral(amount).format('0[.]000000a')}</span>
          <span>{currency}</span>
        </div>
        <div className='text-nowrap'>{numeral(amount * conversion).format('0[.]00a')} USD</div>
      </div>
    );
  }

  render() {
    return (
      <div className='UserInfo'>
        {this.renderBalance(this.props.balanceEth, 'ETH', this.props.conversion)}
        {this.renderBalance(this.props.balanceFrs, 'FRS', this.props.conversion)}
        <div className='UserInfo__photo ml-2 mr-1 d-none d-md-block'/>
        <div className='d-none d-md-block'>
          Ramin Javadi<br/>
          {this.props.account &&
            <div className='UserInfo__wallet text-muted text-truncate'>Wallet: {this.props.account}</div>
          }
        </div>
      </div>
    );
  }
}

export default UserInfo;
