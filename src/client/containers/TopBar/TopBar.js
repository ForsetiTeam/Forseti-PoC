import { connect } from 'react-redux';

import { checkPlugin } from '../../services/metamask';
import { fetchRequestSig } from '../../redux/actions/metamask/processMetamask';
import TopBarContainer from './components/TopBarContainer';

function mapStateToProps(state) {
  const metamask = state.metamask;
  const currentUser = state.currentUser;
  const hasPlugin = checkPlugin();

  return { hasPlugin, metamask, currentUser };
}

const mapDispatchToProps = dispatch => ({
  fetchRequestSig: () => dispatch(fetchRequestSig())
});


export default connect(mapStateToProps, mapDispatchToProps)(TopBarContainer);
