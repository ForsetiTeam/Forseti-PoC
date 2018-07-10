import { connect } from 'react-redux';

import DisputeWndContainer from './components/DisputeWndContainer';

import { fetchVoteDispute } from '../../redux/actions/dispute/voteDispute';
import { fetchStartDispute } from '../../redux/actions/dispute/startDispute';
import { fetchFinishDispute } from '../../redux/actions/dispute/finishDispute';

function mapStateToProps(state, props) {
  const currentUser = state.currentUser.user;
  const isAuthor = currentUser.id === props.dispute.author;
  const isLoading = state.dispute.loadingItem;
  const error = state.dispute.errorItem;

  return { isAuthor, isLoading, error };
}

const mapDispatchToProps = dispatch => ({
  fetchVoteDispute: (disputeId, abstain, decision) => dispatch(fetchVoteDispute(disputeId, abstain, decision)),
  fetchStartDispute: dispute => dispatch(fetchStartDispute(dispute)),
  fetchFinishDispute: dispute => dispatch(fetchFinishDispute(dispute))
});

export default connect(mapStateToProps, mapDispatchToProps)(DisputeWndContainer);
