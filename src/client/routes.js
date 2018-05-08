import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './containers/Landing/index';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Landing} />
      <Route path='/' component={Landing} />
    </Switch>
  </main>
);

export default Main;
