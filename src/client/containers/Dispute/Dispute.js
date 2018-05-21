import { connect } from 'react-redux';

import Dispute from './components/Dispute';

import { fetchDispute } from '../../redux/actions/dispute/getDispute';
import { fetchVoteDispute } from '../../redux/actions/dispute/voteDispute';

function mapStateToProps(state, props) {
  const id = props.match.params.disputeId;
  const dispute = state.dispute.list.find(disputeI => disputeI.id === id);
  const currentUser = state.currentUser.user;

  return { id, dispute, currentUser };
}

const mapDispatchToProps = dispatch => ({
  fetchDispute: disputeId => dispatch(fetchDispute(disputeId)),
  fetchVoteDispute: (disputeId, vote) => dispatch(fetchVoteDispute(disputeId, vote))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dispute);
