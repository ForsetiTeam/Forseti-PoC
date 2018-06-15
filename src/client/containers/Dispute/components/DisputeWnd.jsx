import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { Window } from '../../Layer';

import {
  DISPUTE_DECISION_APPROVE,
  DISPUTE_DECISION_DISAPPROVE,
  DISPUTE_DECISION_ABSTAIN
} from '../../../consts';

import SpinnerWaiter from '../../../components/SpinnerWaiter';
import ErrorRequest from '../../../components/ErrorRequest';
import EtherscanLink from '../../../components/EtherscanLink';

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
      if (!dispute.isClosed) {
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
      if (!dispute.isClosed && !dispute.userDecision) {
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
                className='btn btn-danger m-1'
                data-decision={DISPUTE_DECISION_ABSTAIN}
                onClick={this.props.onVote}
              >
                Abstain
              </button>
              <button
                className='btn btn-primary'
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
        <div className='text-muted'>
          <p>{dispute.description}</p>
          <dl className='row no-gutters text-muted'>
            <dt className='col-3 text-right'>Contract:</dt>
            <dd className='col-9 text-truncate'>
              {dispute.ethAddress ? <EtherscanLink address={dispute.ethAddress} /> : 'not started'}
            </dd>
            <dt className='col-3 text-right'>Respondent:</dt>
            <dd className='col-9 text-truncate'><EtherscanLink address={dispute.authorAddress} /></dd>
            <dt className='col-3 text-right'>Applicant:</dt>
            <dd className='col-9 text-truncate'><EtherscanLink address={dispute.authorAddress} /></dd>
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
