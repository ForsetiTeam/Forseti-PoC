import React, { Component } from 'react';
import PropTypes from 'prop-types';

import validate from '../../../services/validate';

class NewDispute extends Component {
  static propTypes = {
    communityId: PropTypes.string,
    community: PropTypes.any,
    fetchCommunity: PropTypes.func,
    fetchCreateDispute: PropTypes.func
  };

  state = {
    contractorAddress: '',
    contractorAddressValid: false,
    contractorAddressError: '',

    formValid: false
  };

  componentDidMount() {
    this.props.fetchCommunity(this.props.communityId);
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log('SUBMIT');
    this.props.fetchCreateDispute({
      title: this.state.title,
      contractorAddress: this.state.contractorAddress,
      eth: this.state.eth,
      description: this.state.description
    }, this.props.community);
  };

  handleChange = validators => event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({ [name]: value }, () => this.validateField(name, value, validators));
  };

  validateField = (fieldName, fieldValue, validators) => {
    const { isValid, error } = validate(fieldValue, validators);

    this.setState({ [`${fieldName}Valid`]: isValid, [`${fieldName}Error`]: error }, this.validateForm);
  };


  validateForm = () => {
    this.setState({
      formValid: this.state.title
    });
  };

  render() {
    return (
      <div>
        <h2 className='text-center'>Create new dispute</h2>
        <form onSubmit={this.handleSubmit}>

          <div className='form-group row'>
            <label htmlFor='title' className='col-sm-4 col-form-label'>Title</label>
            <div className='col-sm-8'>
              <input
                id='title'
                name='title'
                className='form-control'
                onChange={this.handleChange({ required: true, min: 3 })}
              />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='contractorAddress' className='col-sm-4 col-form-label'>Contractor address</label>
            <div className='col-sm-8'>
              <input
                id='contractorAddress'
                name='contractorAddress'
                className='form-control'
                onChange={this.handleChange({})}
              />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='eth' className='col-sm-4 col-form-label'>Eth amount</label>
            <div className='col-sm-8'>
              <input
                id='eth'
                name='eth'
                className='form-control'
                onChange={this.handleChange({})}
              />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='description' className='col-sm-4 col-form-label'>Description</label>
            <div className='col-sm-8'>
              <input
                id='description'
                name='description'
                className='form-control'
                onChange={this.handleChange({})}
              />
            </div>
          </div>
          <div className='text-center'>
            <button type='submit' className='btn btn-primary' disabled={!this.state.formValid}>Create dispute</button>
          </div>
        </form>
      </div>
    );
  }
}

export default NewDispute;
