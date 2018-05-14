import { connect } from 'react-redux';

import App from './App';

import { fetchLogin } from '../../../redux/actions/auth/authLogin';

const mapDispatchToProps = dispatch => ({
  login: account => dispatch(fetchLogin(account))
});

export default connect(null, mapDispatchToProps)(App);
