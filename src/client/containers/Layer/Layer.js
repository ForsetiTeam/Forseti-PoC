import { connect } from 'react-redux';

import { fetchVersion } from '../../redux/actions/version/getVersion';
import { fetchProcessAccount } from '../../redux/actions/metamask/processMetamask';

import Layer from './components/Layer';

function mapStateToProps(state) {
  const version = state.version.code;
  const isMetamaskLoaded = state.metamask.loaded;

  return { isMetamaskLoaded, version };
}

const mapDispatchToProps = dispatch => ({
  fetchVersion: () => dispatch(fetchVersion()),
  fetchProcessMetamaskAccount: () => dispatch(fetchProcessAccount())
});

export default connect(mapStateToProps, mapDispatchToProps)(Layer);
