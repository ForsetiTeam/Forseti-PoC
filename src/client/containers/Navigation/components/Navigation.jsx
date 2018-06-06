import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Nav, NavText, withRR4 } from 'react-sidenav/src';
import { Nav, NavText, NavIcon } from 'react-sidenav/dist/Nav';
import { withRR4 } from 'react-sidenav/dist/withRR4';

// support router
const SideNav = withRR4();

import { DISPUTE_FILTER_MY, DISPUTE_FILTER_UNANSWERED, DISPUTE_FILTER_ANSWERED } from '../../../consts';

class Navigation extends Component {
  static propTypes = {
    isLogged: PropTypes.bool
  };

  render() {
    const navIconStyle = { width: 25 };

    if (this.props.isLogged) {
      return (
        <SideNav highlightColor='#252525' highlightBgColor='rgba(37, 37, 37, 0.05)'>
          <Nav id='community' key='community'>
            <NavIcon className='lnr lnr-users' style={navIconStyle}/>
            <NavText>Communities</NavText>
          </Nav>
          <Nav collapseIndicatorSize='0.5em' key='dispute'>
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
          <Nav id='about' key='about'>
            <NavIcon className='lnr lnr-question-circle' style={navIconStyle} />
            <NavText>About</NavText>
          </Nav>
        </SideNav>
      );
    } else {
      return (
        <SideNav highlightColor='#252525' highlightBgColor='rgba(37, 37, 37, 0.05)'>
          <Nav id='register' key='register'>
            <NavIcon className='lnr lnr-license' style={navIconStyle} />
            <NavText>Register</NavText>
          </Nav>
          <Nav id='about' key='about'>
            <NavIcon className='lnr lnr-question-circle' style={navIconStyle} />
            <NavText>About</NavText>
          </Nav>
        </SideNav>
      );
    }
  }
}

export default Navigation;
