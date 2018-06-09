import { connect } from 'react-redux';

import DisputesContainer from './components/DisputesContainer';

import { fetchDisputeList } from '../../redux/actions/dispute/getDisputeList';
import { DISPUTE_FILTER_MY, DISPUTE_FILTER_ANSWERED, DISPUTE_FILTER_UNANSWERED } from '../../consts';

function mapStateToProps(state, props) {
  const filter = props.match.params.filter;

  const filterParams = {};

  switch (filter) {
    case DISPUTE_FILTER_MY:
      filterParams.author = true;
      break;
    case DISPUTE_FILTER_ANSWERED:
      filterParams.arbiter = true;
      filterParams.answered = true;
      break;
    case DISPUTE_FILTER_UNANSWERED:
      filterParams.arbiter = true;
      filterParams.answered = false;
      break;
    default: // for ESLINT only!
  }

  return {
    list: state.dispute.list,
    filter,
    filterParams
  };
}

const mapDispatchToProps = (dispatch) => ({
  fetchDisputeList: filter => dispatch(fetchDisputeList(filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(DisputesContainer);
