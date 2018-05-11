import React, { Component } from 'react';
import PropTypes from "prop-types";

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/fontawesome-free-solid';

class Communities extends Component {
  static propTypes = {
    id: PropTypes.string,
    community: PropTypes.any,
    fetchCommunity: PropTypes.func,
    onJoin: PropTypes.func
  };

  componentDidMount() {
    this.props.fetchCommunity(this.props.id);
  }

  handleJoin = () => {
    this.props.onJoin(this.props.id);
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
          <button className='btn m-1' onClick={this.handleJoin}>Join</button>
          <button className='btn m-1'>Add dispute</button>
        </div>
      </div>
    );
  }
}

export default Communities;
