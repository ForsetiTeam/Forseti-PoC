import { connect } from 'react-redux';

import NavigationContainer from './components/NavigationContainer';

function mapStateToProps(state) {
  const isLogged = state.curUser.loaded;

  return { isLogged };
}

export default connect(mapStateToProps)(NavigationContainer);
