import { connect } from 'react-redux';

import CommunityController from './components/CommunityController';

import { fetchCommunity } from '../../redux/actions/community/getCommunity';
import { fetchCommunityJoin } from '../../redux/actions/community/joinCommunity';

function mapStateToProps(state, props) {
  const communityName = props.match.params.communityName;
  const community = state.community.list.find(comm => comm.name === communityName);
  const isJoining = state.community.joining;
  const isLoading = state.community.loading;
  const error = state.community.error;
  const isMetamaskLoaded = !!state.metamask.account;

  return { communityName, community, isJoining, isLoading, error, isMetamaskLoaded };
}

const mapDispatchToProps = dispatch => ({
  fetchCommunity: communityName => dispatch(fetchCommunity(communityName)),
  fetchCommunityJoin: community => dispatch(fetchCommunityJoin(community))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommunityController);
