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
        <PrivateRoute path='/community/:communityName/dispute/new' component={NewDispute} />
        <PrivateRoute path='/community/:communityName' component={Community} />
        <PrivateRoute path='/community' component={Communities} />
        <PrivateRoute path='/dispute/filter/:filter' component={Disputes} />
        <PrivateRoute path='/dispute/:disputeId' component={Dispute} />
        <Redirect from='*' to={defPage} />
      </Switch>
    </main>
  );
};

export default Main;
