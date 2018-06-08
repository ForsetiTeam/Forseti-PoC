import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import truncate from 'html-truncate';

class DisputesItem extends Component {
  static propTypes = {
    dispute: PropTypes.shape()
  };

  render() {
    const dispute = this.props.dispute;

    return (
      <div className='Card__content text-center'>
        <h1 className='text-truncate'>{dispute.title}</h1>
        <p className='frsMuted flex-grow-1'>{truncate(dispute.description, 150)}</p>
        <dl className='row no-gutters frsMuted text-left'>
          <dt className='col-4 text-right'>Contract:</dt>
          <dd className='col-8 text-truncate'>{dispute.ethAddress}</dd>
          <dt className='col-4 text-right'>Respondent:</dt>
          <dd className='col-8 text-truncate'>{dispute.authorAddress}</dd>
          <dt className='col-4 text-right'>Applicant:</dt>
          <dd className='col-8 text-truncate'>{dispute.authorAddress}</dd>
          <dt className='col-4 text-right'>Community:</dt>
          <dd className='col-8'>{dispute.communityName}</dd>
        </dl>
        <div className='Card__bottom'>
          <Link to={`/dispute/${dispute.id}`} className='btn btn-primary'>Learn more</Link>
        </div>
      </div>
    );
  }
}

export default DisputesItem;
