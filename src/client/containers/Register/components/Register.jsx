import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ErrorRequest from '../../../components/ErrorRequest';

class Register extends Component {
  static propTypes = {
    isSigned: PropTypes.bool,
    isMetamaskInstalled: PropTypes.bool,
    error: PropTypes.any,
    validatorErrors: PropTypes.any,
    canSubmit: PropTypes.bool,

    onChange: PropTypes.func,
    onSubmit: PropTypes.func
  };

  render() {
    return (
      <div className='Register'>
        <div className='Register__center'>
          <div className='Register__logo' />
          <form className='Register__form' onSubmit={this.props.onSubmit}>
            <h1>Welcome To Forseti!</h1>
            <p className='text-muted'>Forseti provide a protocol for fair disputes resolution, trustable data
              feeds(oracles) powered by domain experts DAO`s incentivised by unique reputation system.</p>
            {!this.props.isMetamaskInstalled &&
              <ErrorRequest error='You need install MetaMask plugin to continue!'/>
            }
            {this.props.isMetamaskInstalled && !this.props.isSigned &&
              <ErrorRequest error='You need sign at MetaMask plugin to continue!'/>
            }
            <div className='form-group d-flex align-items-baseline'>
              <label className='mr-3 font-weight-bold' htmlFor='inputEmail'>E-mail</label>
              <div className='flex-grow-1 mr-3'>
                <input
                  name='email'
                  className='form-control d-inline-block'// d-inline-block for FFX
                  id='inputEmail'
                  placeholder='name@example.com'
                  onChange={this.props.onChange}
                />
              </div>
              <button type='submit' className='btn btn-primary' disabled={!this.props.canSubmit}>Submit</button>
            </div>
            {this.props.error &&
            <p className='text-danger'>{this.props.error}</p>
            }
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
