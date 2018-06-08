import { connect } from 'react-redux';

import Navigation from './components/Navigation';

function mapStateToProps(state) {
  const isMetamaskLoaded = !!state.metamask.account;
  const isLogged =  state.currentUser.loaded;

  return { isMetamaskLoaded, isLogged };
}

export default connect(mapStateToProps)(Navigation);
