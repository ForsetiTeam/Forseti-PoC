import { connect } from 'react-redux';

import Dispute from './components/Dispute';

import { fetchDispute } from '../../redux/actions/dispute/getDispute';

function mapStateToProps(state, props) {
  const id = props.match.params.disputeId;
  const dispute = state.dispute.list.find(disputeI => disputeI.id === id);
  const curUser = state.curUser.user;

  return { id, dispute, curUser };
}

const mapDispatchToProps = dispatch => ({
  fetchDispute: (id) => dispatch(fetchDispute(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dispute);
