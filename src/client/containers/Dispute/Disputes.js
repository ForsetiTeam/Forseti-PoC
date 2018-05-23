import { connect } from 'react-redux';

import Disputes from './components/Disputes';

import { fetchDisputeList } from '../../redux/actions/dispute/getDisputeList';
import { DISPUTE_FILTER_MY, DISPUTE_FILTER_OPEN, DISPUTE_FILTER_CLOSED } from '../../consts';

function mapStateToProps(state, props) {
  const filterRaw = props.match.params.filter;
  let owner;
  let status;

  switch (filterRaw) {
    case DISPUTE_FILTER_MY:
      owner = true;
      break;
    case DISPUTE_FILTER_OPEN:
    case DISPUTE_FILTER_CLOSED:
      status = filterRaw;
      break;
    default: // for ESLINT only!
  }
  return { list: state.dispute.list, owner, status };
}

const mapDispatchToProps = (dispatch) => ({
  fetchDisputeList: (owner, status) => dispatch(fetchDisputeList(owner, status))
});

export default connect(mapStateToProps, mapDispatchToProps)(Disputes);
