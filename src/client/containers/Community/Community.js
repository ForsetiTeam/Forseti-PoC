import { connect } from 'react-redux';

import Community from './components/Community';

import { fetchCommunity } from '../../redux/actions/community/getCommunity';
import { fetchCommunityJoin } from '../../redux/actions/community/joinCommunity';

function mapStateToProps(state, props) {
  const id = props.match.params.communityId;
  const community = state.community.list.find(comm => comm.name === id);

  return { id, community };
}

const mapDispatchToProps = dispatch => ({
  fetchCommunity: (id) => dispatch(fetchCommunity(id)),
  onJoin: (id) => dispatch(fetchCommunityJoin(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Community);
