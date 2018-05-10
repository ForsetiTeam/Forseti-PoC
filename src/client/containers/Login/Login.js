import { connect } from 'react-redux';

import Login from './components/Login';

import { fetchLogin } from '../../redux/actions/auth';

function mapStateToProps(state) {
  const user = state.auth;

  return { user };
}

const mapDispatchToProps = dispatch => ({
  onSubmit: (user) => dispatch(fetchLogin(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
