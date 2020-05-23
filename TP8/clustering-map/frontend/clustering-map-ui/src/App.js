import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

//************************************* React Components ****************************************
import Home from './components/Home'
import NewRestaurant from './components/Restaurant/NewRestaurant'
import ModifyRestaurant from './components/Restaurant/EditRestaurant'
import DeleteRestaurant from './components/Restaurant/DeleteRestaurant'
import NotFound from './components/NotFound'
import About from './components/About'

function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route exact path='/' render={ () => <Redirect to='/home' component={Home}/>} />
      <Route exact path='/home' component={Home}/>
      <Route exact path='/about' component={About}/>
      <Route exact path='/restaurant/new' component={NewRestaurant}/>
      <Route exact path='/restaurant/:_id/edit' component={ModifyRestaurant}/>
      <Route exact path='/restaurant/:_id/delete' component={DeleteRestaurant}/>
      <Route component={NotFound} />
    </Switch>
    </BrowserRouter>
  );
}

export default App;
