import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/fontawesome-free-solid';

import { LayerPage } from '../../Layer';
import Page from '../../../components/Page';

import SpinnerWaiter from '../../../components/SpinnerWaiter';
import ErrorRequest from '../../../components/ErrorRequest';

class Community extends Component {
  static propTypes = {
    communityName: PropTypes.string,
    community: PropTypes.shape(),
    isJoining: PropTypes.bool,
    isLoading: PropTypes.bool,
    error: PropTypes.string,
    isMetamaskLoaded: PropTypes.bool,

    fetchCommunity: PropTypes.func,
    fetchCommunityJoin: PropTypes.func
  };

  componentDidMount() {
    if (this.props.isMetamaskLoaded) {
      this.props.fetchCommunity(this.props.communityName);
    }
  }

  componentWillUpdate(newProps) {
    if (!this.props.isMetamaskLoaded && newProps.isMetamaskLoaded) {
      this.props.fetchCommunity(this.props.communityName);
    }
  }

  handleJoin = () => {
    this.props.fetchCommunityJoin(this.props.community);
  };

  render() {
    if (this.props.isLoading) return <SpinnerWaiter isLoading={this.props.isLoading} />;
    if (this.props.error) return <ErrorRequest error={this.props.error} />;

    const comm = this.props.community;

    if (!comm) return <div />;
    return (
      <LayerPage
        topic={comm.title}
        comment={comm.description}
      >
        <Page isSingle>
          <div>
            <div className='row justify-content-center m-3'>
              <div className='col-3'>
                <FontAwesomeIcon icon={icons[comm.icon]} className='display-1'/>
              </div>
              <div className='col-6'>
                <div>Pool address: {comm.poolAddress}</div>
                <div>Solved dispute: {comm.disputesSolved}</div>
                <div>Active members: {comm.usersActive}</div>
              </div>
            </div>
            <div className='text-center'>
              <button className='btn m-1 btn-primary' onClick={this.handleJoin} disabled={this.props.isJoining}>
                {comm.isJoined ? 'Leave' : 'Join'}
              </button>
              <SpinnerWaiter isLoading={this.props.isJoining} />
              <Link to={`/community/${comm.name}/dispute/new`} className='btn m-1 btn-info'>Add dispute</Link>
            </div>
          </div>
        </Page>
      </LayerPage>
    );
  }
}

export default Community;
