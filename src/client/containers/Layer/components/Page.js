import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from "classnames";

class Page extends Component {
  static propTypes = {
    isSingle: PropTypes.bool,
    children: PropTypes.node
  };

  renderCard(card, i) {
    return <div className={classnames({ Card: true, 'Card_single': this.props.isSingle })} key={i}>{card}</div>;
  }

  render() {
    console.log('children', this.props.children);

    const children = this.props.children;
    const content = this.props.isSingle ?
      this.renderCard(children, 0) :
      children.map((card, i) => this.renderCard(card, i));

    return (
      <div className='Page'>
        {content}
      </div>
    );
  }
}

export default Page;
