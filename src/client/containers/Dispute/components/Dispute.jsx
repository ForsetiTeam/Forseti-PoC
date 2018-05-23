import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { request, downloadFile } from '../../../redux/actions/utils/axios';
import apiRoutes from '../../../redux/apiRoutes';

import { DISPUTE_VOTE_APPROVE, DISPUTE_VOTE_DISAPPROVE, DISPUTE_VOTE_ABSTAIN } from '../../../consts';

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

  handleToggle = e => {
    e.preventDefault();
    this.setState({ isToggled: !this.state.isToggled });
  };

  handleDownloadDocument = e => {
    e.preventDefault();
    request('get', apiRoutes.disputeDocument(this.props.id)).then(response => downloadFile(response));
  };

  handleVote = e => {
    e.preventDefault();
    const vote = e.target.dataset.vote;

    this.props.fetchVoteDispute(this.props.id, vote);

    this.handleToggle(e);
  };

  isArbiter() {
    return this.props.dispute.author !== this.props.currentUser.id;
  }

  renderButtons() {
    if (this.isArbiter()) {
      if (this.state.isToggled) {
        return (
          <div>
            <button className='btn btn-danger m-1' data-vote={DISPUTE_VOTE_DISAPPROVE} onClick={this.handleVote}>
              Disaprove
            </button>
            <button className='btn btn-warning m-1' data-vote={DISPUTE_VOTE_ABSTAIN} onClick={this.handleVote}>
              Abstain
            </button>
            <button className='btn btn-success m-1' data-vote={DISPUTE_VOTE_APPROVE} onClick={this.handleVote}>
              Aprove
            </button>
          </div>
        );
      }
      return <button className='btn btn-info m-1' onClick={this.handleToggle}>Resolve</button>;
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
