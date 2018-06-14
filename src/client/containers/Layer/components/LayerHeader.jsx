import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserInfo from '../UserInfo';

class LayerHeader extends Component {
  static propTypes = {
    topic: PropTypes.string,
    comment: PropTypes.string,

    onToggleMenu: PropTypes.func
  };

  render() {
    return (
      <div className='LayerHeader'>
        <button
          className='d-md-none lnr lnr-list btn btn-primary btn-icon mr-2'
          onClick={this.props.onToggleMenu}
          title='toggle side menu'
        />
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
