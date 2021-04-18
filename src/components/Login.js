import React, {useRef, useState} from 'react'
import { GetContext } from '../contexts/UserAuth'
import { Link, useHistory } from 'react-router-dom'

export default function Login() {

    const history = useHistory()
    const { login, signInWithGoogle } = GetContext();
    const emailSignupRef = useRef();
    const passwordSignupRef = useRef();
    const [errorMessage, setError] = useState('');
    const [isBusy, setBusy] = useState(false);
    

    async function handleLogin(e) {
        e.preventDefault();
        setError('');
        try{
            setBusy(true);
            await login(emailSignupRef.current.value, passwordSignupRef.current.value);
            history.push("/main");
        } 
        catch {
            setError('Account Login Failed')
        }
        setBusy(false);
    }

    async function handleGoogle(e) {
        e.preventDefault();
        setError('');
        try{
            setBusy(true);
            await signInWithGoogle();
            history.push("/main");
        }
        catch {
            setError('Account Login Failed')
        }
        setBusy(false);

    }

    return (
        <>
            <div className="sign-component">

                <h2>Login</h2>
                <div className="error">{errorMessage}</div>
                <form onSubmit={handleLogin}>
                    <label>Email</label>
                    <input type="email" name="email" ref={emailSignupRef} required />
                    <label>Password</label>
                    <input type="password" name="password" ref={passwordSignupRef} required />
                    <input type="submit" disabled={isBusy}/>
                </form>
                <div className="alt-link">
                    <button onClick={handleGoogle}>Google</button>
                Switch to <Link to="/signup">Signup</Link>
                </div>
            </div>
        </>
    )
}
