import React, { Component } from 'react';
import Main from '../../routes';

import { checkPlugin/* , getAccount */ } from '../../services/metamask';

import Layer from '../Layer/index';
import NoMetamask from './components/noMetamask';
// import NoMetamaskAccount from './components/noMetamaskAccount';

import './App.scss';

class App extends Component {
  render() {
    let content = <Main />;

    if (!checkPlugin()) {
      content = <NoMetamask />;
    } /* else if (!getAccount()) {
      content = <NoMetamaskAccount />;
    } */

    return (
      <div className='App'>
        <Layer>
          {content}
        </Layer>
      </div>
    );
  }
}

export default App;

/* erosion cigar drill snake axis pink actor letter drift leader hawk wire*/
