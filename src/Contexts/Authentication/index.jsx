import React, { useContext, useState, useEffect } from "react"
import { auth, authService } from "../../firebase"

const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setLoading(false)
    })
    
    return unsubscribe
  }, [])

  const signUp = (email, password) => {
    return authService.createUserWithEmailAndPassword(email, password)
  }

  const signInWithEmailAndPassword = (email, password) => {
    return authService.signInWithEmailAndPassword(email, password)
  }

  const signInWithGoogle = () => {
    return authService.signInWithPopup(new auth.GoogleAuthProvider())
  }

  const signInWithTwitter = () => {
    return authService.signInWithPopup(new auth.TwitterAuthProvider())
  }

  const signInWithFacebook = () => {
    return authService.signInWithPopup(new auth.FacebookAuthProvider())
  }

  const signOut = () => {
    return authService.signOut()
  }
 
  const value = {
    currentUser,
    signUp,
    signInWithEmailAndPassword,
    signInWithGoogle,
    signInWithTwitter,
    signInWithFacebook,
    signOut
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}