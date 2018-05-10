import { connect } from 'react-redux';

import RegisterContainer from './components/RegisterContainer';

import { fetchRegister } from '../../redux/actions/auth';
import { requestSign } from '../../services/metamask';

function mapStateToProps(state) {
  const auth = state.auth;

  return { auth };
}

const mapDispatchToProps = dispatch => ({
  onSubmit: user => dispatch(fetchRegister(user)),
  onRequestSign: message => requestSign(message)
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);
