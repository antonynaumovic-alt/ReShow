import React, { useRef, useState } from 'react';

import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';



firebase.initializeApp({
  apiKey: "AIzaSyAfrnZVcJp1YKRwd940ofe-y7XIKTvMSPk",
  authDomain: "reshowbase.firebaseapp.com",
  databaseURL: "https://reshowbase.firebaseio.com",
  projectId: "reshowbase",
  storageBucket: "reshowbase.appspot.com",
  messagingSenderId: "156367547920",
  appId: "1:156367547920:web:58d8d32dfc1c90d3746495",
  measurementId: "G-MGFZ1WC0VQ"
});


const auth = firebase.auth();
const firestore = firebase.firestore();


function App() {

const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <SignOut />
      </header>
      <section>
          {user ? <ChatRoom /> : <SignInGoogle /> : <SignIn />}
        </section>

    </div>
  );
}
firebase.auth().onAuthStateChanged(function(user)) {
  if(user){

  }else{

  }
}
function SignIn() {
  var email = document.getElementById("email_feild").value;
  var password = document.getElementById("password_feild").value;
  firebase.auth().signInWithEmailAndPassword(email, password).then((userCredentials) => {
    var user = userCredentials.user;
  })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });

  return(
    <>
      <button onClick={signInWithEmailAndPassword}> Sign In </button>
      </>
  )
}

function SignInGoogle() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return(
  <>
    <button onClick={signInWithGoogle}>Sign In Google</button>
    </>
  )
}

function SignOut() {
  return auth.currentUser &&
  (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}


function ChatRoom() {
  
  const msgCol = firestore.collection('messages');
  const query = msgCol.orderBy('createdAt').limit(25);
  const [messages] = useCollectionData(query, {idField: 'id'});
  const[formValue, setFormValue] = useState('');
  const dummy = useRef();

  const sendMessage = async(change) => {
    change.preventDefault();
    const {uid, photoURL} = auth.currentUser;

    await msgCol.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    });
    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });

  }
  return(
  <>
    <main>
      <p>{messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}</p>
        <span ref={dummy}></span>
    </main>
      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(change) => setFormValue(change.target.value)} placeholder="Enter Something :)" />
        <button type="submit" disabled={!formValue}>🖂</button>
      </form>
  </>
  )
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} alt="Message" />
      <p>{text}</p>
    </div>
  )
}


export default App;
