import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LayerHeader from './LayerHeader';

class LayerPage extends Component {
  static propTypes = {
    topic: PropTypes.string,
    comment: PropTypes.string,
    children: PropTypes.node
  };

  render() {
    return (
      <div>
        <div className='Layer__topbar'>
          <LayerHeader
            topic={this.props.topic}
            comment={this.props.comment}
          />
        </div>
        <div className='Layer__content'>
          <div className='Layer__page'>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default LayerPage;
