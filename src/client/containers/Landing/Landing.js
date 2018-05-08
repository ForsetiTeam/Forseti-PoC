import { connect } from 'react-redux';

import { fetchVersion } from '../../redux/actions/version';

import Landing from './components/Landing';

function mapStateToProps(state) {
  const version = state.version.code;

  return { version };
}

const mapDispatchToProps = dispatch => ({
  fetchVersion: () => dispatch(fetchVersion())
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
