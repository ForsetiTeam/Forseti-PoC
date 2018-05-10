import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Landing from './containers/Landing/index';
import About from './containers/About/index';
import Register from './containers/Register/index';

const Main = () => (
  <main>
    <Switch>
      <Redirect exact from='/' to='/login' />
      <Route exact path='/' component={Landing} />
      <Route path='/about' component={About} />
      <Route path='/register' component={Register} />
    </Switch>
  </main>
);

export default Main;
