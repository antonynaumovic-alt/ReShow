import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import './App.css';
import './components/Footer.css';

////////////////////////////////
import Navbar from './components/Navbar';
import Menu from './components/Menu';
import Homepage from './components/Homepage';
import Call from './components/Call';
import Contact from './components/Contact';
import Features from './components/Features';
import Mission from './components/Mission';
import Main from './components/Main';
import Notes from './components/Notes';
import Chat from './components/ChatSystem/Chat';


import Signup from './components/Signup';
import Login from './components/Login';
import { UserAuth } from './contexts/UserAuth';

function App() {

  const ErrorPage = ({ location }) => (            
    <h1>
      ERROR 404 Not Found
    </h1>
)


  return (
    <>
      <Router>
        <UserAuth>
          <Menu />
          <Switch>
            <Route exact path='/' component={Homepage}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/signup' component={Signup}/>
            <Route exact path='/contact' component={Contact}/>
            <Route exact path='/features' component={Features}/>
            <Route exact path='/mission' component={Mission}/>
            <Route exact path='/main' component={Main}/>
            <Route exact path='/main/rooms' component={Call}/>
            <Route exact path='/main/notes' component={Notes}/>
            <Route exact path='/main/chat' component={Chat}/>
            <Route component={ErrorPage} />
          </Switch>
        </UserAuth>
      </Router>

    </>
  );
}

export default App;
