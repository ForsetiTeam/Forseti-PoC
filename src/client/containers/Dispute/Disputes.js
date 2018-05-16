import { connect } from 'react-redux';

import Disputes from './components/Disputes';

import { fetchDisputeList } from '../../redux/actions/dispute/getDisputeList';

function mapStateToProps(state, props) {
  const filterRaw = props.match.params.filter;
  let owner;
  let status;

  if (filterRaw === 'my') {
    owner = true;
  } else {
    status = filterRaw;
  }
  return { list: state.dispute.list, owner, status };
}

const mapDispatchToProps = (dispatch) => ({
  fetchDisputeList: (owner, status) => dispatch(fetchDisputeList(owner, status))
});

export default connect(mapStateToProps, mapDispatchToProps)(Disputes);
