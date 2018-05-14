import { connect } from 'react-redux';

import Communities from './components/Communities';

import { fetchCommunityList } from '../../redux/actions/community/getCommunityList';

function mapStateToProps(state) {
  return { list: state.community.list };
}

const mapDispatchToProps = (dispatch) => ({
  fetchCommunityList: () => dispatch(fetchCommunityList())
});

export default connect(mapStateToProps, mapDispatchToProps)(Communities);
