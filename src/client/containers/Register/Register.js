import { connect } from 'react-redux';

import RegisterContainer from './components/RegisterContainer';

import { fetchRegister } from '../../redux/actions/auth/authRegister';
import { requestSig, checkPlugin } from '../../services/metamask';

function mapStateToProps(state) {
  const currentUser = state.currentUser;
  const metamask = state.metamask;
  const isMetamaskInstalled = checkPlugin();

  return { currentUser, metamask, isMetamaskInstalled };
}

const mapDispatchToProps = dispatch => ({
  onSubmit: user => dispatch(fetchRegister(user)),
  onRequestSig: message => requestSig(message)
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);
