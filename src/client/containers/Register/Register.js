import { connect } from 'react-redux';

import RegisterContainer from './components/RegisterContainer';

import { fetchRegister } from '../../redux/actions/authRegister';
import { requestSig } from '../../services/metamask';

function mapStateToProps(state) {
  const isLogged = state.auth.loaded;

  return { isLogged };
}

const mapDispatchToProps = dispatch => ({
  onSubmit: user => dispatch(fetchRegister(user)),
  onRequestSig: message => requestSig(message)
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);
