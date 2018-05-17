import { connect } from 'react-redux';

import { fetchVersion } from '../../redux/actions/version';
import { fetchLogin } from '../../redux/actions/auth/authLogin';
import { fetchLoadMetamask } from '../../redux/actions/metamask/loadMetaMask';

import Layer from './components/Layer';

function mapStateToProps(state) {
  const version = state.version.code;
  const isMetamaskLoaded = state.metamask.loaded;

  return { isMetamaskLoaded, version };
}

const mapDispatchToProps = dispatch => ({
  fetchVersion: () => dispatch(fetchVersion()),
  fetchLoadMetamask: () => dispatch(fetchLoadMetamask()),
  fetchLogin: (account, token) => dispatch(fetchLogin(account, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(Layer);
