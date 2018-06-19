import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { request, downloadFile } from '../../../redux/actions/utils/axios';
import apiRoutes from '../../../redux/apiRoutes';

import DisputeWnd from './DisputeWnd';

class DisputeWndContainer extends Component {
  static propTypes = {
    dispute: PropTypes.shape(),
    isAuthor: PropTypes.bool,
    isLoading: PropTypes.bool,
    error: PropTypes.string,

    fetchVoteDispute: PropTypes.func,
    fetchStartDispute: PropTypes.func,
    fetchFinishDispute: PropTypes.func
  };

  state = {
    isToggled: false
  };

  handleToggle = e => {
    e.preventDefault();
    this.setState({ isToggled: !this.state.isToggled });
  };

  handleStart = e => {
    e.preventDefault();
    this.props.fetchStartDispute(this.props.dispute);
  };

  handleFinish = e => {
    e.preventDefault();
    this.props.fetchFinishDispute(this.props.dispute);
  };

  handleDownloadDocument = e => {
    e.preventDefault();
    request('get', apiRoutes.disputeDocument(this.props.dispute.id), {}, { responseType: 'blob' })
      .then(response => downloadFile(response));
  };

  handleVote = e => {
    e.preventDefault();
    const decision = e.target.dataset.decision;

    this.props.fetchVoteDispute(this.props.dispute.id, decision);

    this.setState({ isToggled: false });
  };

  render() {
    return (
      <DisputeWnd
        dispute={this.props.dispute}
        isAuthor={this.props.isAuthor}
        isToggled={this.state.isToggled}
        isLoading={this.props.isLoading}
        error={this.props.error}

        onToggle={this.handleToggle}
        onVote={this.handleVote}
        onStart={this.handleStart}
        onFinish={this.handleFinish}
        onDownloadDocument={this.handleDownloadDocument}
      />
    );
  }
}

export default DisputeWndContainer;
