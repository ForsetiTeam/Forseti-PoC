import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  DISPUTE_DECISION_APPROVE,
  DISPUTE_DECISION_DISAPPROVE,
  DISPUTE_DECISION_ABSTAIN,
  DISPUTE_STATUS_OPEN, DISPUTE_STATUS_CLOSED
} from '../../../consts';
import SpinnerWaiter from '../../../components/SpinnerWaiter';
import ErrorRequest from '../../../components/ErrorRequest';

class Dispute extends Component {
  static propTypes = {
    dispute: PropTypes.shape(),
    isAuthor: PropTypes.bool,
    isLoading: PropTypes.bool,
    isToggled: PropTypes.bool,
    error: PropTypes.string,

    onToggle: PropTypes.func,
    onVote: PropTypes.func,
    onStart: PropTypes.func,
    onFinish: PropTypes.func,
    onDownloadDocument: PropTypes.func
  };

  renderButtons() {
    const dispute = this.props.dispute;

    if (this.props.isAuthor) {
      if (!dispute.ethAddress) {
        return (
          <div>
            <button
              className='btn btn-success m-1'
              onClick={this.props.onStart}
              disabled={this.props.isLoading}
            >
              Start
            </button>
            <SpinnerWaiter isLoading={this.props.isLoading}/>
            <ErrorRequest error={this.props.error}/>
          </div>
        );
      }
      if (dispute.status !== DISPUTE_STATUS_CLOSED) {
        return (
          <div>
            <button
              className='btn btn-success m-1'
              onClick={this.props.onFinish}
            >
              Finish
            </button>
          </div>
        );
      }
    } else {
      if (!dispute.ethAddress) return;
      if (!dispute.userIsArbiter) return;
      if (dispute.status === DISPUTE_STATUS_OPEN && !dispute.userDecision) {
        if (this.props.isToggled) {
          return (
            <div>
              <button
                className='btn btn-danger m-1'
                data-decision={DISPUTE_DECISION_DISAPPROVE}
                onClick={this.props.onVote}
              >
                Disaprove
              </button>
              <button
                className='btn btn-success m-1'
                data-decision={DISPUTE_DECISION_APPROVE}
                onClick={this.props.onVote}
              >
                Aprove
              </button>
            </div>
          );
        } else {
          return (
            <div>
              <button
                className='btn btn-warning m-1'
                data-decision={DISPUTE_DECISION_ABSTAIN}
                onClick={this.props.onVote}
              >
                Abstain
              </button>
              <button
                className='btn btn-info m-1'
                onClick={this.props.onToggle}
              >
                Resolve
              </button>
            </div>
          );
        }
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
            {dispute.ethAddress && this.props.isAuthor &&
              <p>Vote summary: {dispute.usersVoted} voted, {dispute.usersRejected} rejected</p>
            }
            {dispute.hasOwnProperty('userDecision') &&
              <p className='font-weight-bold'>Your decision: {dispute.userDecision}</p>
            }
            {dispute.document &&
              <p><a href='#' onClick={this.props.onDownloadDocument}>Download document</a></p>
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
