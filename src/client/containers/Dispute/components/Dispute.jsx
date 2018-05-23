import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { request, downloadFile } from '../../../redux/actions/utils/axios';
import apiRoutes from '../../../redux/apiRoutes';

import {
  DISPUTE_DECISION_APPROVE,
  DISPUTE_DECISION_DISAPPROVE,
  DISPUTE_DECISION_ABSTAIN,
  DISPUTE_STATUS_OPEN
} from '../../../consts';

class Dispute extends Component {
  static propTypes = {
    id: PropTypes.string,
    dispute: PropTypes.shape(),
    currentUser: PropTypes.shape(),
    documentLink: PropTypes.string,

    fetchDispute: PropTypes.func,
    fetchVoteDispute: PropTypes.func
  };

  state = {
    isToggled: false
  };

  componentDidMount() {
    this.props.fetchDispute(this.props.id);
  }

  handleOpen = e => {
    e.preventDefault();
    this.setState({ isToggled: !this.state.isToggled });
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

  isArbiter() {
    return this.props.currentUser && this.props.dispute.author !== this.props.currentUser.id;
  }

  renderButtons() {
    const dispute = this.props.dispute;

    if (dispute.status === DISPUTE_STATUS_OPEN && this.isArbiter() && !dispute.userDecision) {
      if (this.state.isToggled) {
        return (
          <div>
            <button className='btn btn-danger m-1' data-decision={DISPUTE_DECISION_DISAPPROVE} onClick={this.handleVote}>
              Disaprove
            </button>
            <button className='btn btn-success m-1' data-decision={DISPUTE_DECISION_APPROVE} onClick={this.handleVote}>
              Aprove
            </button>
          </div>
        );
      } else {
        return (
          <div>
            <button className='btn btn-warning m-1' data-decision={DISPUTE_DECISION_ABSTAIN} onClick={this.handleVote}>
              Abstain
            </button>
            <button className='btn btn-info m-1' onClick={this.handleOpen}>Resolve</button>
          </div>
        );
      }
    }
  }

  render() {
    const dispute = this.props.dispute;

    if (!dispute) return <div>No entry or no access</div>;
    return (
      <div>
        <h3 className='text-center'>{dispute.title}</h3>
        <div className='row justify-content-center m-3'>
          <div className='col-6'>
            <p>Author: {dispute.author}</p>
            <p>Community: {dispute.community}</p>
            <p>Description: {dispute.description}</p>
            <p>Arbiters count: {dispute.arbitersNeed}</p>
            <p>Status: {dispute.status}</p>
            {dispute.userDecision &&
              <p className='font-weight-bold'>Your decision: {dispute.userDecision}</p>
            }
            {dispute.document &&
              <p><a href='#' onClick={this.handleDownloadDocument}>Download document</a></p>
            }
          </div>
        </div>
        <div className='text-center'>
          {this.renderButtons()}
        </div>
      </div>
    );
  }
}

export default Dispute;
