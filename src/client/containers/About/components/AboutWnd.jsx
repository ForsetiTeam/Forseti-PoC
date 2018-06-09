import React, { Component } from 'react';

import { Window } from '../../Layer';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/fontawesome-free-brands';

class AboutWnd extends Component {
  render() {
    return (

      <Window topic='About'>
        <h1>Forseti is …</h1>
        <p className='frsMuted'>
          Forseti provide a protocol for fair disputes resolution, trustable data feeds(oracles) powered by
          domain experts DAO`s incentivised by unique reputation system.
        </p>
        <div>
          <a
            className='btn btn-primary mr-3'
            href='https://forseti.im/public/forseti_wp_0.6.pdf'
            target='_blank'
          >Find more at whitepaper</a>
          <a
            className='btn btn-primary mr-3'
            href='https://github.com/ForsetiTeam'
            target='_blank'
          >Find more at our Github</a>
          <a
            className='btn btn-primary btn-icon mr-3'
            href='https://t.me/forseti_chat_ru'
            target='_blank'
          >
            <FontAwesomeIcon icon={icons.faTelegramPlane} style={{ color: '#fff', width: 16, height: 16 }}/>
          </a>
        </div>
      </Window>
    );
  }
}

export default AboutWnd;
