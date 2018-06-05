import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorRequest from '../../../components/ErrorRequest';

class NewDispute extends Component {
  static propTypes = {
    community: PropTypes.shape(),
    formValid: PropTypes.bool,
    errors: PropTypes.shape(),
    onSubmit: PropTypes.func,
    onChange: PropTypes.func
  };

  render() {
    return (
      <div>
        <h2 className='text-center'>Create new dispute</h2>
        <form onSubmit={this.props.onSubmit}>
          <div className='form-group row'>
            <label htmlFor='title' className='col-sm-4 col-form-label'>Title *</label>
            <div className='col-sm-8'>
              <input
                id='title'
                name='title'
                className='form-control'
                placeholder='Dispute`s title'
                onChange={this.props.onChange({ required: true, minLength: 3, maxLength: 255 })}
              />
              <ErrorRequest error={this.props.errors.titleError} />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='contractorAddress' className='col-sm-4 col-form-label'>Contractor address</label>
            <div className='col-sm-8'>
              <input
                id='contractorAddress'
                name='contractorAddress'
                className='form-control'
                placeholder='not used yet'
                onChange={this.props.onChange({})}
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
                placeholder='not used yet'
                onChange={this.props.onChange({})}
              />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='description' className='col-sm-4 col-form-label'>Description *</label>
            <div className='col-sm-8'>
              <input
                id='description'
                name='description'
                className='form-control'
                placeholder='Short disputes`s description'
                onChange={this.props.onChange({ required: true, minLength: 3, maxLength: 2400 })}
              />
              <ErrorRequest error={this.props.errors.descriptionError} />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='arbitersNeed' className='col-sm-4 col-form-label'>Arbiters count *</label>
            <div className='col-sm-8'>
              <input
                id='arbitersNeed'
                name='arbitersNeed'
                className='form-control'
                placeholder='Count of arbiters need to solve the dispute'
                onChange={this.props.onChange({ required: true, integer: true, minValue: 1, maxValue: 999 })}
              />
              <ErrorRequest error={this.props.errors.arbitersNeedError} />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='document' className='col-sm-4 col-form-label'>Upload file</label>
            <div className='col-sm-8'>
              <input
                type='file'
                id='document'
                name='document'
                className='form-control'
                placeholder='Document attached to dispute'
                onChange={this.props.onChange({})}
              />
            </div>
          </div>
          <div className='text-center'>
            <button type='submit' className='btn btn-primary' disabled={!this.props.formValid}>Create dispute</button>
          </div>
        </form>
      </div>
    );
  }
}

export default NewDispute;
