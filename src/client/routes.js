import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import { checkPlugin } from './services/metamask';
import { getUser } from './services/localStore';

import About from './containers/About';
import Register from './containers/Register';
import { Communities, Community } from './containers/Community';
import { Disputes, Dispute, NewDispute } from './containers/Dispute';

import PrivateRoute from './containers/App/components/PrivateRoute';

const Main = () => {
  const isLogged = checkPlugin() && !!getUser();

  const defPage = isLogged ? '/community' : '/register';

  return (
    <main>
      <Switch>
        <Redirect exact from='/' to={defPage} />
        <Route path='/about' component={About} />
        <Route path='/register' component={Register} />
        <PrivateRoute path='/community/:communityName/dispute/new' component={NewDispute} isLogged={isLogged} />
        <PrivateRoute path='/community/:communityName' component={Community} isLogged={isLogged} />
        <PrivateRoute path='/community' component={Communities} isLogged={isLogged} />
        <PrivateRoute path='/dispute/filter/:filter' component={Disputes} isLogged={isLogged} />
        <PrivateRoute path='/dispute/:disputeId' component={Dispute} isLogged={isLogged} />
        <Redirect from='*' to={defPage} />
      </Switch>
    </main>
  );
};

export default Main;
