import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CommunitiesItem from './CommunitiesItem';

class Communities extends Component {
  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape),
    fetchCommunityList: PropTypes.func
  };

  componentDidMount() {
    this.props.fetchCommunityList();
  }

  render() {
    return (
      <div className='d-flex flex-wrap'>
        {this.props.list.map(community =>
          <CommunitiesItem key={community.name} community={community}/>
        )}
      </div>
    );
  }
}

export default Communities;
