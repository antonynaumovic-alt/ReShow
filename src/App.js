import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import './App.css';


////////////////////////////////

import Navbar from './components/Navbar';
import Menu from './components/Menu';
import Homepage from './components/Homepage';
import Login from './components/Login';


function App() {
  return (
    <>
      <Router>
        <Menu />
        <Switch>
          <Route path='/' exact component={Homepage}/>
          <Route path='/login' exact component={Login}/>
        </Switch>
      </Router>

    </>
  );
}

export default App;
