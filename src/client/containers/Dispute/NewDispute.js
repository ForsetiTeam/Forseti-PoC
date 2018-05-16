import { connect } from 'react-redux';

import NewDispute from './components/NewDispute';

import { fetchCommunity } from '../../redux/actions/community/getCommunity';
import { fetchCreateDispute } from '../../redux/actions/dispute/createDispute';

function mapStateToProps(state, props) {
  const communityId = props.match.params.communityId;
  const community = state.community.list.find(communityI => communityI.name === communityId);

  return { communityId, community };
}

const mapDispatchToProps = dispatch => ({
  fetchCommunity: id => dispatch(fetchCommunity(id)),
  fetchCreateDispute: (dispute, community) => dispatch(fetchCreateDispute(dispute, community))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewDispute);
