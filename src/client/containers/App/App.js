import { connect } from 'react-redux';

import App from './components/App';

import { fetchLogin } from '../../redux/actions/auth/authLogin';
import { fetchLoadMetamask } from '../../redux/actions/metamask/loadMetaMask';

function mapStateToProps(state) {
  const isMetamaskLoaded = state.metamask.loaded;

  return { isMetamaskLoaded };
}

const mapDispatchToProps = dispatch => ({
  fetchLoadMetamask: () => dispatch(fetchLoadMetamask()),
  fetchLogin: account => dispatch(fetchLogin(account))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
