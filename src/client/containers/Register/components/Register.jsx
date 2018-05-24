import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ErrorRequest from '../../../components/ErrorRequest';

class Register extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    onRequestSig: PropTypes.func,
    canSubmit: PropTypes.bool,
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
          {this.props.errors && this.props.errors.account &&
            <p className='text-danger'>{this.props.errors.account.msg}</p>
          }
          <button type='submit' className='btn btn-primary' disabled={!this.props.canSubmit}>Submit</button>
          {!this.props.isSigned &&
            <ErrorRequest error='MetaMask account not signed'/>
          }
        </form>
      </div>
    );
  }
}

export default Register;