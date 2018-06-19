import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Window } from '../../Layer';

import ErrorRequest from '../../../components/ErrorRequest';

class NewDisputeWnd extends Component {
  static propTypes = {
    formValid: PropTypes.bool,
    errors: PropTypes.shape(),
    onSubmit: PropTypes.func,
    onChange: PropTypes.func
  };

  render() {
    return (
      <Window topic='Add dispute'>
        <form onSubmit={this.props.onSubmit}>
          <div className='form-group row'>
            <label htmlFor='title' className='col-sm-4 col-form-label'>Title *</label>
            <div className='col-sm-8'>
              <input
                id='title'
                name='title'
                className='form-control'
                placeholder='Name of dispute'
                onChange={this.props.onChange({ required: true, minLength: 3, maxLength: 255 })}
              />
              <ErrorRequest error={this.props.errors.titleError} />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='description' className='col-sm-4 col-form-label'>Description *</label>
            <div className='col-sm-8'>
              <textarea
                id='description'
                name='description'
                className='form-control'
                placeholder='A few words about dispute'
                rows={4}
                onChange={this.props.onChange({ required: true, minLength: 3, maxLength: 2400 })}
              />
              <ErrorRequest error={this.props.errors.descriptionError} />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='contractorAddress' className='col-sm-4 col-form-label'>Respondent address</label>
            <div className='col-sm-8'>
              <input
                id='contractorAddress'
                name='contractorAddress'
                className='form-control'
                placeholder='Ethereum wallet address'
                onChange={this.props.onChange({})}
              />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='eth' className='col-sm-4 col-form-label'>Eth amount *</label>
            <div className='col-sm-8'>
              <input
                id='eth'
                name='eth'
                className='form-control'
                placeholder='not used yet'
                onChange={this.props.onChange({ required: true, number: true })}
              />
            </div>
            <ErrorRequest error={this.props.errors.ethError} />
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
              <label className='btn btn-primary'>
                Browse
                <input
                  type='file'
                  id='document'
                  name='document'
                  className='form-control'
                  placeholder='Document attached to dispute'
                  onChange={this.props.onChange({})}
                  hidden
                />
              </label>
            </div>
          </div>
          <button type='submit' className='btn btn-primary' disabled={!this.props.formValid}>Submit</button>
        </form>
      </Window>
    );
  }
}

export default NewDisputeWnd;
