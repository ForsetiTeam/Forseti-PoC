import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { LayerPage, Page } from '../../Layer';
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
      <LayerPage
        topic='Communities'
        comment='Is atomic unit of domain experts community builded on trust and reputation'
      >
        <Page>
          {this.props.list.map(community =>
            <CommunitiesItem key={community.name} community={community}/>
          )}
        </Page>
      </LayerPage>
    );
  }
}

export default Communities;
