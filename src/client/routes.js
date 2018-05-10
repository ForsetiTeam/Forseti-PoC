import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import { checkPlugin } from './services/metamask';
import { getUser } from './services/localStore';

import About from './containers/About/index';
import Register from './containers/Register/index';
import Login from './containers/Login/index';

const Main = () => {
  const isLogged = checkPlugin() && getUser();

  const defPage = isLogged ? '/dispute' : '/register';

  return !isLogged ?
    <main>
      <Switch>
        <Redirect exact from='/' to={defPage} />
        <Route path='/about' component={About} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Redirect from='*' to={defPage} />
      </Switch>
    </main>
    :
    <main>
      <Switch>
        <Redirect exact from='/' to={defPage} />
        <Route path='/dispute' component={About} />
        <Redirect from='*' to={defPage} />
      </Switch>
    </main>
  ;
};

export default Main;

/*

import { connect } from "react-redux";
import PropTypes from "prop-types";

class Main extends Component {
  static propTypes = {
    isLogged: PropTypes.bool
  };

  render() {
    return (
      <main>
        <Switch>
          <Redirect exact from='/' to='/register' />
          <Route path='/about' component={About} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
        </Switch>
      </main>
    );
  }
}

function mapStateToProps(state) {
  const isLogged = state.auth.loaded;

  return { isLogged };
}

export default connect(mapStateToProps)(Main);
*/
