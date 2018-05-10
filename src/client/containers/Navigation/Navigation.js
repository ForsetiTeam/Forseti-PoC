import { connect } from 'react-redux';

import NavigationContainer from './components/NavigationContainer';

function mapStateToProps(state) {
  const auth = state.auth;

  return { auth };
}

export default connect(mapStateToProps)(NavigationContainer);
