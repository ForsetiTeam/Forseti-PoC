import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/fontawesome-free-solid';
import EtherscanLink from '../../../components/EtherscanLink';

class CommunitiesItem extends Component {
  static propTypes = {
    community: PropTypes.shape()
  };

  render() {
    const comm = this.props.community;

    return (
      <div className='Card__content text-center'>
        <div className='d-flex flex-column h-100 align-items-center'>
          <FontAwesomeIcon icon={icons[comm.icon]} className='display-1'/>
          <h1 className='w-100 text-truncate'>{comm.title}</h1>
          <p className='text-muted flex-grow-1'>{comm.description}</p>
          <dl className='row no-gutters text-muted w-100'>
            <dt className='col-7 text-right'>Pool address:</dt>
            <dd className='col-5 text-left text-truncate'><EtherscanLink address={comm.poolAddress} /></dd>
            <dt className='col-7 text-right'>Solved dispute:</dt>
            <dd className='col-5 text-left'>{comm.disputesSolved}</dd>
            <dt className='col-7 text-right'>Model:</dt>
            <dd className='col-5 text-left'>Meritocraty</dd>
          </dl>
        </div>
        <div className='Card__bottom'>
          <Link to={`/community/${comm.name}`} className='btn btn-primary'>Learn more</Link>
        </div>
      </div>
    );
  }
}

export default CommunitiesItem;
