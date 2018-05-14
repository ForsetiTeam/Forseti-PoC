import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Navigation from '../../Navigation';
import './Layer.scss';

class Layer extends Component {
  static propTypes = {
    children: PropTypes.node,
    version: PropTypes.string,
    fetchVersion: PropTypes.func
  };

  componentDidMount() {
    this.props.fetchVersion();
  }

  render() {
    return (
      <div className='Layer'>
        <div className='Layer__tabs'>
          <Navigation />
        </div>
        <div className='Layer__content border p-3'>
          {this.props.children}
        </div>

        <div className='Layer__version'>V {this.props.version || '...'}</div>
      </div>
    );
  }
}

export default Layer;
