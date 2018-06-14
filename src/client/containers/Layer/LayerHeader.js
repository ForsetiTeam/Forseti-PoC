import { connect } from 'react-redux';

import LayerHeader from './components/LayerHeader';
import toggleLeftMenu from '../../redux/actions/interface/toggleLeftMenu';

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = dispatch => ({
  onToggleMenu: () => dispatch(toggleLeftMenu())
});

export default connect(mapStateToProps, mapDispatchToProps)(LayerHeader);
