import { connect } from 'react-redux';

import LoginContainer from './components/LoginContainer';

import { fetchLogin } from '../../redux/actions/auth/authLogin';
import { loadAccount, requestSig } from '../../services/metamask';

function mapStateToProps(state) {
  const isLogged = state.curUser.loaded;

  return { isLogged };
}

const mapDispatchToProps = dispatch => ({
  loadAccount: () => loadAccount(),
  requestSig: message => requestSig(message),
  login: (account, sig) => dispatch(fetchLogin(account, sig))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
