import { connect } from 'react-redux';

import RegisterContainer from './components/RegisterContainer';

import { fetchRegister } from '../../redux/actions/auth/authRegister';
import { fetchRequestSig } from '../../redux/actions/metamask/processMetamask';
import { checkPlugin } from '../../services/metamask';

function mapStateToProps(state) {
  const currentUser = state.currentUser;
  const metamask = state.metamask;
  const isMetamaskInstalled = checkPlugin();

  return { currentUser, metamask, isMetamaskInstalled };
}

const mapDispatchToProps = dispatch => ({
  fetchRequestSig: () => dispatch(fetchRequestSig()),
  onSubmit: user => dispatch(fetchRegister(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);
