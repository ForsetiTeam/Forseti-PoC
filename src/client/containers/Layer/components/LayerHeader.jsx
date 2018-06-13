import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserInfo from '../UserInfo';

class LayerHeader extends Component {
  static propTypes = {
    topic: PropTypes.string,
    comment: PropTypes.string
  };

  render() {
    return (
      <div className='LayerHeader'>
        <div className='LayerHeader__title'>
          <div className='LayerHeader__topic text-truncate'>{this.props.topic}</div>
          <div className='text-muted text-truncate'>{this.props.comment}</div>
        </div>
        <div className='LayerHeader__userInfo'>
          <UserInfo />
        </div>
      </div>
    );
  }
}

// <TopBar />

export default LayerHeader;
