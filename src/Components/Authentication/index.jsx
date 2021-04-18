import React, { useRef } from "react"

import { useAuth } from "../../Contexts/Authentication"

import googleIcon from "../../Assets/Images/GoogleIcon.png"
import twitterIcon from "../../Assets/Images/TwitterIcon.png"
import facebookIcon from "../../Assets/Images/FacebookIcon.png"

export const SignIn = () => {
  const emailRef = useRef()
  const passwordRef = useRef()

  const { signInWithEmailAndPassword, signInWithGoogle, signInWithTwitter, signInWithFacebook } = useAuth()

  const signInSubmit = () => {
    return signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
  }

  return (
    <div className="sign-in">
      <form className="email-password-sign-in" onSubmit={signInSubmit}>
        <input className="sign-in-input sign-in-email" placeholder="Email" type="email" ref={emailRef} required/>
        <input className="sign-in-input sign-in-password" placeholder="Password" type="password" ref={passwordRef} required/>
        
        <button className="btn-sign-in" type="submit">Sign In</button>
      </form>

      <img src={googleIcon} alt="Log in with Google" className="btn-social-sign-in btn-google-sign-in" onClick={signInWithGoogle} />
      <img src={twitterIcon} alt="Log in with Twitter" className="btn-social-sign-in btn-twitter-sign-in" onClick={signInWithTwitter} />
      <img src={facebookIcon} alt="Log in with Facebook" className="btn-social-sign-in btn-facebook-sign-in" onClick={signInWithFacebook} />

      <p className="sign-in-result" />
    </div>
  )
}

export const SignOut = () => {
  const { signOut } = useAuth()

  return (
    <button className="btn-sign-out" onClick={signOut}>Sign Out</button>
  )
}

export const AuthPage = () => {
  const { currentUser } = useAuth()

  if (currentUser) {
    return (
      <>
        <p>Signed in as {currentUser.uid}</p>
        <SignOut />
      </>
    )
  }

  return (
    <SignIn />
  )
}