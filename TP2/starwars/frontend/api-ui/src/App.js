import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

import Episodes from './components/Episodes'
import ManageEpisode from './components//Episodes/ManageEpisode';
import NotFound from './components/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={ () => (<Redirect to="/episodes"/>) } />
        <Route exact path="/episodes" component={ Episodes } />
        <Route exact path="/episodes/:episode/manage" component={ ManageEpisode } />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
