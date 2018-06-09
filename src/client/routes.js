import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import { checkPlugin } from './services/metamask';
import { getUser } from './services/localStore';

import Register from './containers/Register';
import { Communities, Community } from './containers/Community';
import { Disputes } from './containers/Dispute';

import PrivateRoute from './containers/App/components/PrivateRoute';

const Main = () => {
  const isLogged = checkPlugin() && !!getUser();
  const isMetamaskLoaded = checkPlugin() && !!window.web3.eth.coinbase;
  const defPage = isLogged && isMetamaskLoaded ? '/community' : '/register';

  return (
    <Switch>
      <Redirect exact from='/' to={defPage} />
      <Route path='/register' component={Register} />
      <PrivateRoute path='/community/:communityName' component={Community} />
      <PrivateRoute path='/community' component={Communities} />
      <PrivateRoute path='/dispute/filter/:filter' component={Disputes} />
      <Redirect from='*' to={defPage} />
    </Switch>
  );
};

export default Main;
