import { connect } from 'react-redux';

import NavigationContainer from './components/NavigationContainer';

function mapStateToProps(state) {
  const isLogged = state.auth.loaded;

  return { isLogged };
}

export default connect(mapStateToProps)(NavigationContainer);
