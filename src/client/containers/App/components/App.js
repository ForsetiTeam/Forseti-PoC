import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { checkPlugin, getAccount, loadAccount } from '../../../services/metamask';

import Layer from '../../Layer/index';
import Main from '../../../routes';
import NoMetamask from './noMetamask';
import NoMetamaskAccount from './noMetamaskAccount';

import './App.scss';

class App extends Component {
  static propTypes = {
    login: PropTypes.func
  };

  componentDidMount() {
    // т.к. аккаунт сразу не доступен, то нам нужно загрузить его самостоятельно
    loadAccount()
      .then(account => {
        // загрузили аккаунт
        this.forceUpdate();
        if (account && this.props.login) {
          this.props.login(account);
        }
      })
      .catch();
  }

  render() {
    let content = <Main />;

    if (!checkPlugin()) {
      content = <NoMetamask />;
    } else if (!getAccount()) {
      content = <NoMetamaskAccount />;
    }

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
