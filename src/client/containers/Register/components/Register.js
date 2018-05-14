import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SpinnerWaiter from '../../../components/SpinnerWaiter';

class Register extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    onRequestSig: PropTypes.func,
    canSubmit: PropTypes.bool,
    isSigning: PropTypes.bool,
    isSigned: PropTypes.bool,
    errors: PropTypes.any
  };

  render() {
    return (
      <div>
        <h2 className='text-center pt-3'>Registration</h2>
        <form onSubmit={this.props.onSubmit}>
          <div className='form-group row'>
            <label htmlFor='inputEmail' className='col-sm-2 col-form-label'>Email</label>
            <div className='col-sm-10'>
              <input
                name='email'
                className='form-control'
                id='inputEmail'
                placeholder='name@example.com'
                onChange={this.props.onChange}
              />
              {this.props.errors && this.props.errors.email &&
                <p className='text-danger'>{this.props.errors.email.msg}</p>
              }
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='inputPoolAddress' className='col-sm-2 col-form-label'>Pool Address</label>
            <div className='col-sm-10'>
              <input
                name='poolAddress'
                className='form-control'
                id='inputPoolAddress'
                placeholder='???'
                onChange={this.props.onChange}
              />
            </div>
          </div>
          {this.props.errors && this.props.errors.account &&
            <p className='text-danger'>{this.props.errors.account.msg}</p>
          }
          {!this.props.isSigned ?
            <div>
              <button className='btn btn-warning' onClick={this.props.onRequestSig}>Request sign</button>
              <SpinnerWaiter isLoading={this.props.isSigning}/>
            </div>
            :
            <button type='submit' className='btn btn-primary' disabled={!this.props.canSubmit}>Submit</button>
          }
        </form>
      </div>
    );
  }
}

export default Register;
