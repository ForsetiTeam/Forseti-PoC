import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Card extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return (
      <div className='Cards'>
        {this.props.children.map((item, i) => <div className='Cards__item' key={i}>{item}</div>)}
      </div>
    );
  }
}

export default Card;
