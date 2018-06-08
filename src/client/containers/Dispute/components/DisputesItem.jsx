import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class DisputesItem extends Component {
  static propTypes = {
    dispute: PropTypes.shape()
  };

  render() {
    const dispute = this.props.dispute;
    console.log('DISPUTE', dispute);

    return (
      <div className='Card__content text-center'>
        <div className='Card__title'>{dispute.title}</div>
        <div className='frsMuted'>
          <p>{dispute.description}</p>
          <dl className='row no-gutters text-left'>
            <dt className='col-4 text-right'>Contract:</dt>
            <dd className='col-8 text-truncate'>{dispute.ethAddress}</dd>
            <dt className='col-4 text-right'>Respondent:</dt>
            <dd className='col-8 text-truncate'>{dispute.authorAddress}</dd>
            <dt className='col-4 text-right'>Applicant:</dt>
            <dd className='col-8 text-truncate'>{dispute.authorAddress}</dd>
            <dt className='col-4 text-right'>Community:</dt>
            <dd className='col-8'>{dispute.communityName}</dd>
          </dl>
        </div>
        <div className='Card__bottom'>
          <Link to={`/dispute/${dispute.id}`} className='btn'>Learn more</Link>
        </div>
      </div>
    );
  }
}

export default DisputesItem;
