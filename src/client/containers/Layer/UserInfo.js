import { connect } from 'react-redux';

import UserInfo from './components/UserInfo';

function mapStateToProps(state) {
  const metamask = state.metamask;

  return { ...metamask };
}

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
