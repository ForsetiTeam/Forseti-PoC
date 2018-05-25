import { connect } from 'react-redux';

import Disputes from './components/Disputes';

import { fetchDisputeList } from '../../redux/actions/dispute/getDisputeList';
import { DISPUTE_FILTER_MY, DISPUTE_FILTER_ANSWERED, DISPUTE_FILTER_UNANSWERED } from '../../consts';

function mapStateToProps(state, props) {
  const filterRaw = props.match.params.filter;

  const filter = {};

  switch (filterRaw) {
    case DISPUTE_FILTER_MY:
      filter.author = true;
      break;
    case DISPUTE_FILTER_ANSWERED:
      filter.arbiter = true;
      filter.answered = true;
      break;
    case DISPUTE_FILTER_UNANSWERED:
      filter.arbiter = true;
      filter.answered = false;
      break;
    default: // for ESLINT only!
  }
  return { list: state.dispute.list, filter };
}

const mapDispatchToProps = (dispatch) => ({
  fetchDisputeList: filter => dispatch(fetchDisputeList(filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(Disputes);
