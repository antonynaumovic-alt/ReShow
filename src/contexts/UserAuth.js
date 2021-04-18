import { auth, prov } from "../firebase"
import React, { useState, useEffect, useContext, useHistory } from 'react'


const UserAuthContext = React.createContext()

export function GetContext() {
    return useContext(UserAuthContext)
}


export function UserAuth({ children }) {

    const [currentUser, setCurUser] = useState()
    const [isLoading, SetLoading] = useState(true);
    
    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }
    function signout() {
        return auth.signOut()
    }

    function signInWithGoogle() {
        return auth.signInWithPopup(prov);
    }
      

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {setCurUser(user); SetLoading(false)})
        return unsubscribe
    }, 
    [])

    const value = {
        currentUser,
        signup,
        login,
        signout,
        signInWithGoogle
    }

    return (
        <UserAuthContext.Provider value={value}>{!isLoading && children}</UserAuthContext.Provider>
    )
}
