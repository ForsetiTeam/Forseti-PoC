import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Navigation extends Component {
  static propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      uri: PropTypes.string.isRequired
    }))
  };

  static defaultProps = {
    tabs: []
  };

  render() {
    return (
      <ul className='list-group'>
        {this.props.tabs.map((tab, i) => (
          <li key={i} className='list-group-item'>
            <Link to={tab.uri}>{tab.title}</Link>
          </li>
        ))}
      </ul>
    );
  }
}

export default Navigation;
