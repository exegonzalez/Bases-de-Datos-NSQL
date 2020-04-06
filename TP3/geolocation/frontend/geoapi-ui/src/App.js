import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

import Home from './components/Home'
import Client from './components/Client'
import NotFound from './components/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' render={ () => <Redirect to='/home' component={ Home }/>}/>
        <Route exact path='/home' component={ Home }/>
        <Route exact path='/client' component={ Client }/>
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
