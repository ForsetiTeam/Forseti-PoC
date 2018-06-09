import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Popup from 'reactjs-popup';

import WindowContext from './WindowContext';

class CustomPopup extends Component {
  static propTypes = {
    trigger: PropTypes.node,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    children: PropTypes.node
  };

  static childContextTypes = {
    handleWndClose: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.renderChildren = this.renderChildren.bind(this);
  }

  getChildContext() {
    console.log('getChildContext');
    return { handleWndClose: this.handleWndClose };
  }

  renderChildren(handleClose) {
    return (
      <WindowContext.Provider value={{ handleClose }}>
        {this.props.children}
      </WindowContext.Provider>
    );
  }

  render() {
    return (
      <Popup
        modal
        trigger={this.props.trigger}
        open={this.props.open}
        onClose={this.props.onClose}
        contentStyle={{ background: 'none', border: 0, padding: 0, width: 'auto' }}
      >
        {this.renderChildren}
      </Popup>
    );
  }
}

export default CustomPopup;
