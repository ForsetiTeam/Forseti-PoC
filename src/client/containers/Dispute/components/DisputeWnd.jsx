import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { Window } from '../../Layer';

import {
  DISPUTE_DECISION_APPROVE,
  DISPUTE_DECISION_DISAPPROVE,
  DISPUTE_DECISION_ABSTAIN,
  DISPUTE_STATUS_OPEN, DISPUTE_STATUS_CLOSED
} from '../../../consts';
import SpinnerWaiter from '../../../components/SpinnerWaiter';
import ErrorRequest from '../../../components/ErrorRequest';

class DisputeWnd extends Component {
  static propTypes = {
    dispute: PropTypes.shape(),
    isAuthor: PropTypes.bool,
    isToggled: PropTypes.bool,
    isLoading: PropTypes.bool,
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
          <Fragment>
            <button
              className='btn btn-success m-1'
              onClick={this.props.onStart}
              disabled={this.props.isLoading}
            >
              Start
            </button>
            <SpinnerWaiter isLoading={this.props.isLoading}/>
            <ErrorRequest error={this.props.error}/>
          </Fragment>
        );
      }
      if (dispute.status !== DISPUTE_STATUS_CLOSED) {
        return (
          <button
            className='btn btn-success m-1'
            onClick={this.props.onFinish}
          >
            Finish
          </button>
        );
      }
    } else {
      if (!dispute.ethAddress) return;
      if (!dispute.userIsArbiter) return;
      if (dispute.status === DISPUTE_STATUS_OPEN && !dispute.userDecision) {
        if (this.props.isToggled) {
          return (
            <Fragment>
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
            </Fragment>
          );
        } else {
          return (
            <Fragment>
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
            </Fragment>
          );
        }
      }
    }
  }

  renderContent() {
    const dispute = this.props.dispute;

    return (
      <Fragment>
        <h1>{dispute.title}</h1>
        <div className='frsMuted'>
          <p>{dispute.description}</p>
          <dl className='row no-gutters frsMuted'>
            <dt className='col-3 text-right'>Respondent:</dt>
            <dd className='col-9 text-truncate'>{dispute.authorAddress}</dd>
            <dt className='col-3 text-right'>Applicant:</dt>
            <dd className='col-9 text-truncate'>{dispute.authorAddress}</dd>
            <dt className='col-3 text-right'>Community:</dt>
            <dd className='col-9'>{dispute.communityName}</dd>
            <dt className='col-3 text-right'>Arbiters count:</dt>
            <dd className='col-9'>{dispute.arbitersNeed}</dd>
            <dt className='col-3 text-right'>Status:</dt>
            <dd className='col-9'>{dispute.status}</dd>
            {dispute.ethAddress && this.props.isAuthor &&
              <Fragment>
                <dt className='col-3 text-right'>Vote summary:</dt>
                <dd className='col-9'>{dispute.usersVoted} voted, {dispute.usersRejected} abstained</dd>
              </Fragment>
            }
            {dispute.userDecision &&
              <Fragment>
                <dt className='col-3 text-right'>Your decision:</dt>
                <dd className='col-9'>{dispute.userDecision}</dd>
              </Fragment>
            }
            {dispute.document &&
              <Fragment>
                <dt className='col-3 text-right'>Evidences:</dt>
                <dd className='col-9'><a href='#' onClick={this.props.onDownloadDocument}>Download document</a></dd>
              </Fragment>
            }
          </dl>
        </div>
        {this.renderButtons()}
      </Fragment>
    );
  }

  render() {
    return (
      <Window topic='Dispute information'>
        {this.props.dispute ? this.renderContent() : <div>No entry or no access</div>}
      </Window>
    );
  }
}

export default DisputeWnd;
