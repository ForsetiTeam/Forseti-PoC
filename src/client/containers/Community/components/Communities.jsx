import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { LayerPage } from '../../Layer';
import CommunitiesItem from './CommunitiesItem';
import Cards from '../../../components/Cards';

class Communities extends Component {
  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape),
    fetchCommunityList: PropTypes.func
  };

  componentDidMount() {
    this.props.fetchCommunityList();
  }

  render() {
    const list = this.props.list.length ? [this.props.list[0], this.props.list[0], this.props.list[0], this.props.list[0],
      this.props.list[0], this.props.list[0], this.props.list[0], this.props.list[0]] : [];

    return (
      <LayerPage
        topic='Communities'
        comment='Is atomic unit of domain experts community builded on trust and reputation'
      >
        <Cards>
          {list.map(community =>
            <CommunitiesItem key={community.name} community={community}/>
          )}
        </Cards>
      </LayerPage>
    );
  }
}

export default Communities;
