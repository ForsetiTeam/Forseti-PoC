import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NewDisputeWnd from './NewDisputeWnd';
import validate from '../../../services/validate';

class NewDisputeWndContainer extends Component {
  static propTypes = {
    onFetchCreateDispute: PropTypes.func
  };

  state = {
    titleValid: false,
    titleError: '',

    contractorAddressValid: true,
    contractorAddressError: '',

    ethValid: false,
    ethError: '',

    descriptionValid: false,
    descriptionError: '',

    arbitersNeedValid: false,
    arbitersNeedError: '',

    formValid: false
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.props.onFetchCreateDispute({
      title: this.state.title,
      contractorAddress: this.state.contractorAddress,
      eth: this.state.eth,
      description: this.state.description,
      arbitersNeed: this.state.arbitersNeed,
      document: this.state.document
    });
  };

  handleChange = validators => event => {
    const target = event.target;

    const name = target.name;
    const value = target.type === 'file' ? target.files[0] : target.value;

    this.setState({ [name]: value }, () => this.validateField(name, value, validators));
  };

  validateField = (fieldName, fieldValue, validators) => {
    const { isValid, error } = validate(fieldValue, validators);

    this.setState({ [`${fieldName}Valid`]: isValid, [`${fieldName}Error`]: error }, this.validateForm);
  };

  validateForm = () => {
    this.setState({
      formValid: this.state.titleValid && this.state.descriptionValid && this.state.arbitersNeedValid && this.state.ethValid
    });
  };

  render() {
    return (
      <NewDisputeWnd
        formValid={this.state.formValid}
        errors={this.state}

        onSubmit={this.handleSubmit}
        onChange={this.handleChange}
      />
    );
  }
}

export default NewDisputeWndContainer;
