import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Nav, NavText, withRR4 } from 'react-sidenav/src';
import { Nav, NavText, NavIcon } from 'react-sidenav/dist/Nav';
import { withRR4 } from 'react-sidenav/dist/withRR4';

// support router
const SideNav = withRR4();

import { Popup } from '../../Layer';
import { AboutWnd } from '../../About';

import { DISPUTE_FILTER_MY, DISPUTE_FILTER_UNANSWERED, DISPUTE_FILTER_ANSWERED } from '../../../consts';

const navIconStyle = { width: 25 };
const mainOptions = { highlightColor: '#252525', highlightBgColor: 'rgba(37, 37, 37, 0.05)' };

class Navigation extends Component {
  static propTypes = {
    isLogged: PropTypes.bool,
    isMetamaskLoaded: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = { showAbout: false };
  }

  handleOpenAboutClick = () => {
    this.setState({ showAbout: true });
  };

  handleCloseAboutWnd = () => {
    this.setState({ showAbout: false });
  };

  render() {
    return (
      <SideNav {...mainOptions}>
        <Nav id='community'>
          <NavIcon className='lnr lnr-users' style={navIconStyle}/>
          <NavText>Communities</NavText>
        </Nav>
        <Nav collapseIndicatorSize='0.5em'>
          <NavIcon className='lnr lnr-bullhorn' style={navIconStyle} />
          <NavText>Disputes</NavText>
          <Nav id={`dispute/filter/${DISPUTE_FILTER_MY}`}>
            <NavText>My disputes</NavText>
          </Nav>
          <Nav id={`dispute/filter/${DISPUTE_FILTER_UNANSWERED}`}>
            <NavText>Incoming disputes</NavText>
          </Nav>
          <Nav id={`dispute/filter/${DISPUTE_FILTER_ANSWERED}`}>
            <NavText>Closed disputes</NavText>
          </Nav>
        </Nav>
        <a onClick={this.handleOpenAboutClick}>
          <Nav id=''>
            <NavIcon className='lnr lnr-question-circle' style={navIconStyle} />
            <NavText>About</NavText>

          </Nav>
        </a>

        <Popup open={this.state.showAbout} onClose={this.handleCloseAboutWnd}>
          <AboutWnd/>
        </Popup>
      </SideNav>
    );
  }
}

export default Navigation;
