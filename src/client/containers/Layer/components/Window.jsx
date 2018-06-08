import React, { Component } from 'react';
import PropTypes from 'prop-types';

import WindowContext from './WindowContext';

class Window extends Component {
  static propTypes = {
    topic: PropTypes.string,
    children: PropTypes.node
  };

  render() {
    console.log('WINDOW', this, this.context.handleWndClose);

    return (
      <WindowContext.Consumer>
        {({ handleClose }) => (
          <div className='Window'>
            <div className='Window__header'>
              <span className='Window__topic'>{this.props.topic}</span>
              <button className='Window__close lnr lnr-cross' onClick={handleClose}/>
            </div>
            <div className='Window__content'>
              {this.props.children}
            </div>
          </div>
        )}
      </WindowContext.Consumer>
    );
  }
}

export default Window;
