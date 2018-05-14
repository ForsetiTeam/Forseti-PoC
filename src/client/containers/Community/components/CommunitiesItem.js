import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/fontawesome-free-solid';

class CommunitiesItem extends Component {
  static propTypes = {
    community: PropTypes.any
  };

  render() {
    const comm = this.props.community;

    return (
      <div className='col-6 d-inline-block'>
        <div className='border p-3 h-100'>
          <h3 className='text-center'>{comm.title}</h3>
          <FontAwesomeIcon icon={icons[comm.icon]} className='display-1 float-left mr-3'/>
          <div className='clearfix'>
            <p className='mt-3'>{comm.description}</p>
            <div>Solved dispute: {comm.disputesSolved}</div>
            <div>Active members: {comm.membersActive}</div>
          </div>
          <div className='text-center mt-3'>
            <Link to={`/community/${comm.name}`} className='btn btn-info'>More info</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default CommunitiesItem;
