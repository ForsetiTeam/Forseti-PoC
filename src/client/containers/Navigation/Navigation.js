import { connect } from 'react-redux';

import NavigationContainer from './components/NavigationContainer';

function mapStateToProps(state) {
  const isMetamaskLoaded = state.metamask.loaded;
  const isLogged =  state.currentUser.loaded;

  return { isMetamaskLoaded, isLogged };
}

export default connect(mapStateToProps)(NavigationContainer);
