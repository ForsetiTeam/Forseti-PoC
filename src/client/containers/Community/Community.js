import { connect } from 'react-redux';

import Community from './components/Community';

import { fetchCommunity } from '../../redux/actions/community/getCommunity';
import { fetchCommunityJoin } from '../../redux/actions/community/joinCommunity';

function mapStateToProps(state, props) {
  const communityName = props.match.params.communityName;
  const community = state.community.list.find(comm => comm.name === communityName);
  const isJoined = state.currentUser.user && state.currentUser.user.communities.includes(communityName);

  return { communityName, community, isJoined };
}

const mapDispatchToProps = dispatch => ({
  fetchCommunity: communityName => dispatch(fetchCommunity(communityName)),
  onJoin: communityName => dispatch(fetchCommunityJoin(communityName))
});

export default connect(mapStateToProps, mapDispatchToProps)(Community);
