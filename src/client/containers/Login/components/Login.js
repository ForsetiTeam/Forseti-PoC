import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getAccount } from '../../../services/metamask';

class Login extends Component {
  static propTypes = {
    onSubmit: PropTypes.func
  };

  state = {
    email: '',
    poolAddress: ''
  };

  handleSubmit = e => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      account: getAccount(),
      sign: '12345'
    };

    this.props.onSubmit(user);
  };

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({ [name]: value });
  };

  isFormValid() {
    return !!this.state.email && !!this.state.poolAddress;
  }

  render() {
    return (
      <div>
        <h2 className='text-center pt-3'>Registration</h2>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group row'>
            <label htmlFor='inputEmail' className='col-sm-2 col-form-label'>Email</label>
            <div className='col-sm-10'>
              <input
                name='email'
                className='form-control'
                id='inputEmail'
                placeholder='name@example.com'
                onChange={this.handleChange}
              />
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
                onChange={this.handleChange}
              />
            </div>
          </div>
          <button type='submit' className='btn btn-primary' disabled={!this.isFormValid()}>Submit</button>
        </form>
      </div>
    );
  }
}

export default Register;
