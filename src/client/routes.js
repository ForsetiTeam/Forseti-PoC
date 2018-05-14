import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import { checkPlugin } from './services/metamask';
import { getUser } from './services/localStore';

import About from './containers/About/index';
import Register from './containers/Register/index';
import Login from './containers/Login/index';
import { Communities, Community } from './containers/Community/index';

import PrivateRoute from './containers/App/components/PrivateRoute';

const Main = () => {
  const isLogged = checkPlugin() && !!getUser();

  const defPage = isLogged ? '/community' : '/register';

  return (
    <main>
      <Switch>
        <Redirect exact from='/' to={defPage} />
        <Route path='/about' component={About} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <PrivateRoute path='/community/:communityId' component={Community} isLogged={isLogged} />
        <PrivateRoute path='/community' component={Communities} isLogged={isLogged} />
        <Redirect from='*' to={defPage} />
      </Switch>
    </main>
  );
};

export default Main;
/* <Route path='/community' component={Communities} />
        <PrivateRoute
          path='/community'
          component={Communities}
          isLogged={isLogged}
          redirect={'/register'}
        />
        <PrivateRoute path="/community" currentUser={isLogged} component={Communities} />
        */
