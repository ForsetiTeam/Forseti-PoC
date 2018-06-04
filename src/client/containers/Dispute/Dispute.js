import { connect } from 'react-redux';

import DisputeController from './components/DisputeController';

import { fetchDispute } from '../../redux/actions/dispute/getDispute';
import { fetchVoteDispute } from '../../redux/actions/dispute/voteDispute';
import { fetchStartDispute } from '../../redux/actions/dispute/startDispute';
import { fetchFinishDispute } from '../../redux/actions/dispute/finishDispute';

function mapStateToProps(state, props) {
  const id = props.match.params.disputeId;
  const dispute = state.dispute.list.find(disputeI => disputeI.id === id);
  const currentUser = state.currentUser.user;
  const isAuthor = dispute && currentUser && currentUser.id === dispute.author;
  const isLoading = state.dispute.loading;
  const error = state.dispute.error;

  return { id, dispute, isAuthor, isLoading, error };
}

const mapDispatchToProps = dispatch => ({
  fetchDispute: disputeId => dispatch(fetchDispute(disputeId)),
  fetchVoteDispute: (disputeId, decision) => dispatch(fetchVoteDispute(disputeId, decision)),
  fetchStartDispute: dispute => dispatch(fetchStartDispute(dispute)),
  fetchFinishDispute: dispute => dispatch(fetchFinishDispute(dispute))
});

export default connect(mapStateToProps, mapDispatchToProps)(DisputeController);
