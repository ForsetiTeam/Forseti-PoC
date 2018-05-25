import { connect } from 'react-redux';

import Community from './components/Community';

import { fetchCommunity } from '../../redux/actions/community/getCommunity';
import { fetchCommunityJoin } from '../../redux/actions/community/joinCommunity';

function mapStateToProps(state, props) {
  const communityName = props.match.params.communityName;
  const community = state.community.list.find(comm => comm.name === communityName);
  const currentUser = state.currentUser.user;
  const isJoined = currentUser && community && currentUser.communities.includes(community.id);

  return { communityName, community, isJoined };
}

const mapDispatchToProps = dispatch => ({
  fetchCommunity: communityName => dispatch(fetchCommunity(communityName)),
  fetchCommunityJoin: community => dispatch(fetchCommunityJoin(community))
});

export default connect(mapStateToProps, mapDispatchToProps)(Community);
