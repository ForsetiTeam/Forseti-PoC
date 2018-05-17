import { connect } from 'react-redux';

import Dispute from './components/Dispute';

import { fetchDispute } from '../../redux/actions/dispute/getDispute';

function mapStateToProps(state, props) {
  const id = props.match.params.disputeId;
  const dispute = state.dispute.list.find(disputeI => disputeI.id === id);
  const currentUser = state.currentUser.user;

  return { id, dispute, currentUser };
}

const mapDispatchToProps = dispatch => ({
  fetchDispute: id => dispatch(fetchDispute(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dispute);
