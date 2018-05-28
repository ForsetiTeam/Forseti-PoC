import { connect } from 'react-redux';

import NewDisputeContainer from './components/NewDisputeContainer';

import { fetchCommunity } from '../../redux/actions/community/getCommunity';
import { fetchCreateDispute } from '../../redux/actions/dispute/createDispute';

function mapStateToProps(state, props) {
  const communityName = props.match.params.communityName;
  const community = state.community.list.find(communityI => communityI.name === communityName);

  return { communityName, community };
}

const mapDispatchToProps = dispatch => ({
  fetchCommunity: communityName => dispatch(fetchCommunity(communityName)),
  fetchCreateDispute: (dispute, community) => dispatch(fetchCreateDispute(dispute, community))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewDisputeContainer);
