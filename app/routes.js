import React from 'react';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import {
  App,
  Login,
  NotFound
} from 'containers';

export default (store) => {
  const history = syncHistoryWithStore(browserHistory, store);

  const requireLogin = (nextState, replace, cb) => {
    const { auth: { user }} = store.getState();
    if (!user) {
      // oops, not logged in, so can't be here!
      replace('/login');
    }
    cb();
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Router history={history}>
      <Route path="/" component={App} onEnter={requireLogin} />
      <Route path="login" component={Login} />
      <Route path="*" component={NotFound} status={404} />
    </Router>
  );
};
