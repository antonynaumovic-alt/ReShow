import React, {useRef, useState} from 'react'
import { GetContext } from '../contexts/UserAuth'
import { Link, useHistory } from 'react-router-dom'

export default function Signup() {

    const history = useHistory()
    const { signup } = GetContext();
    const emailSignupRef = useRef();
    const passwordSignupRef = useRef();
    const [errorMessage, setError] = useState('');
    const [isBusy, setBusy] = useState(false);

    async function handleSignup(e) {
        e.preventDefault();
        setError('');
        try{
            setBusy(true);
            await signup(emailSignupRef.current.value, passwordSignupRef.current.value);
            history.push("/main");
        } 
        catch {
            setError('Account Creation Failed')
        }
        setBusy(false);
    }

    return (
        <>
            <div className="sign-component">
                <h2>Sign Up</h2>
                <div>{errorMessage}</div>
                <form onSubmit={handleSignup}>
                    <label>Email</label>
                    <input type="email" name="email" ref={emailSignupRef} required />
                    <label>Password</label>
                    <input type="password" name="password" ref={passwordSignupRef} required />
                    <input type="submit" disabled={isBusy}/>
                </form>
                <div className="alt-link">
                    Switch to <Link to="/login">Login</Link>
                </div>
            </div>
        </>
    )
}
