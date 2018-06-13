import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/fontawesome-free-solid';

class CommunitiesItem extends Component {
  static propTypes = {
    community: PropTypes.shape()
  };

  render() {
    const comm = this.props.community;

    return (
      <div className='Card__content text-center'>
        <div>
          <FontAwesomeIcon icon={icons[comm.icon]} className='display-1'/>
          <h1>{comm.title}</h1>
          <div className='text-muted'>
            <p>{comm.description}</p>
            <dl className='row no-gutters'>
              <dt className='col-7 text-right'>Solved dispute:</dt>
              <dd className='col-5 text-left'>{comm.disputesSolved}</dd>
              <dt className='col-7 text-right'>Model:</dt>
              <dd className='col-5 text-left'>Meritocraty</dd>
            </dl>
          </div>
        </div>
        <div className='Card__bottom'>
          <Link to={`/community/${comm.name}`} className='btn btn-primary'>Learn more</Link>
        </div>
      </div>
    );
  }
}

export default CommunitiesItem;
