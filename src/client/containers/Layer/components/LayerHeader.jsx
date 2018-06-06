import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LayerHeader extends Component {
  static propTypes = {
    topic: PropTypes.string,
    comment: PropTypes.string
  };

  render() {
    return (
      <div className='LayerHeader'>
        <div className='LayerHeader__topic'>{this.props.topic}</div>
        <div className='LayerHeader__comment'>{this.props.comment}</div>
      </div>
    );
  }
}

// <TopBar />

export default LayerHeader;
