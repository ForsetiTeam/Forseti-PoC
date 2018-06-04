import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { request, downloadFile } from '../../../redux/actions/utils/axios';
import apiRoutes from '../../../redux/apiRoutes';

import Dispute from './Dispute';

class DisputeController extends Component {
  static propTypes = {
    id: PropTypes.string,
    dispute: PropTypes.shape(),
    isAuthor: PropTypes.bool,
    documentLink: PropTypes.string,
    isLoading: PropTypes.bool,
    error: PropTypes.error,

    fetchDispute: PropTypes.func,
    fetchVoteDispute: PropTypes.func,
    fetchStartDispute: PropTypes.func,
    fetchFinishDispute: PropTypes.func
  };

  state = {
    isToggled: false
  };

  componentDidMount() {
    this.props.fetchDispute(this.props.id);
  }

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
    request('get', apiRoutes.disputeDocument(this.props.id)).then(response => downloadFile(response));
  };

  handleVote = e => {
    e.preventDefault();
    const decision = e.target.dataset.decision;

    this.props.fetchVoteDispute(this.props.id, decision);

    this.setState({ isToggled: false });
  };

  render() {
    return (
      <Dispute
        dispute={this.props.dispute}
        isAuthor={this.props.isAuthor}
        isLoading={this.props.isLoading}
        isToggled={this.state.isToggled}
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

export default DisputeController;
