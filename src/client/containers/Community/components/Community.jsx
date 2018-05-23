import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/fontawesome-free-solid';

class Community extends Component {
  static propTypes = {
    communityName: PropTypes.string,
    community: PropTypes.shape(),
    isJoined: PropTypes.bool,
    fetchCommunity: PropTypes.func,
    onJoin: PropTypes.func
  };

  componentDidMount() {
    this.props.fetchCommunity(this.props.communityName);
  }

  handleJoin = () => {
    this.props.onJoin(this.props.communityName);
  };

  render() {
    const comm = this.props.community;

    if (!comm) return <div />;
    return (
      <div>
        <h3 className='text-center'>{comm.title}</h3>
        <div className='row justify-content-center m-3'>
          <div className='col-3'>
            <FontAwesomeIcon icon={icons[comm.icon]} className='display-1'/>
          </div>
          <div className='col-6'>
            <p>{comm.description}</p>
            <div>Solved dispute: {comm.disputesSolved}</div>
            <div>Active members: {comm.membersActive}</div>
          </div>
        </div>
        <div className='text-center'>
          <button className='btn m-1 btn-primary' onClick={this.handleJoin}>{this.props.isJoined ? 'Leave' : 'Join'}</button>
          {this.props.isJoined &&
            <Link to={`/community/${comm.name}/dispute/new`} className='btn m-1 btn-info'>Add dispute</Link>
          }
        </div>
      </div>
    );
  }
}

export default Community;
