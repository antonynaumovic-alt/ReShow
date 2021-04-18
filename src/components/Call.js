import React, { useRef, useState }  from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateRoom from "./CreateRoom";
import Room from "../local_modules/Room"; //Room code by Chaim Copyright:https://github.com/coding-with-chaim/native-webrtc
import './Login.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { auth } from "../firebase"

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import logo from "./img/Enrolle.png";
import googleLogo from "./img/googleicon.png";
import twitterLogo from "./img/twittericon.png";
import facebookLogo from "./img/facebookicon.png";

import { GetContext } from '../contexts/UserAuth'

const firestore = firebase.firestore();
const noScroll = require('no-scroll');


function Call() {

  const [error, setError] = useState("");
  const {currentUser, signout} = GetContext()

  const[emailValue, setEmailValue] = useState('');
  const[passValue, setPassValue] = useState('');

  document.body.style.overflow = "hidden";
  return (
    <div className="Login">
      <header>
      </header>
      <main>
      <section className="login-layout">

          <section className="login-socialLogin">            
          {currentUser && <ChatRoom/> }
          </section>
      
      </section>
      </main>
      <div className="logout">
      </div>
      <section className="background">
      <span className="circleoverlay"></span>
      <span className="circleimage"></span>

      </section>
    </div>
  );
}



function ChatRoom() {
  const roomRef = firestore.collection('rooms');
  const query = roomRef.orderBy('createdAt');

  const [ids] = useCollectionData(query, { idField: 'URL'})

  const [linkValue, setLinkValue] = useState('');
  const [passValue, setPassValue] = useState('');

  const setLink = async (e) => {
    e.preventDefault();

    const { uid } = auth.currentUser;


      await roomRef.add({
        URL: linkValue,
        password: passValue,
        uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      })
  

      setLinkValue('');
      setPassValue('');
    }

  return(
  <>
    
    <BrowserRouter className="roomButton">
        <Switch>
          <Route path="/" exact component={CreateRoom} />
          <Route path="/room/:roomID" component={Room} />
        </Switch>
      </BrowserRouter>
      <form onSubmit={setLink}>
        <input className="inputfield" value={linkValue} onChange={(e) => setLinkValue(e.target.value)} placeholder="Name" />
        <input className="inputfield" value={passValue} onChange={(e) => setPassValue(e.target.value)} placeholder="Password" />
        <button className="btn-reserveRoom" type="submit" disabled={!linkValue} >Reserve Room</button>
      </form>
  </>
  )
}

/*

*/


export default Call;
