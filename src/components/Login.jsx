import { useRef, useState } from "react";
import { validateSignIn } from "../utils/validate";

const Login = () => {

    const [isSignIn, setIsSignIn] = useState(true)
    const [errorMessageEmail, setErrorMessageEmail] = useState(null);
    const [errorMessagePass, setErrorMessagePass] = useState(null);

    const email = useRef(null);
    const password = useRef(null);

    const toggleForm = () => {
        setIsSignIn(!isSignIn);
    }
    const handleSignIn = (e) => {
        const message = validateSignIn(email.current.value, password.current.value);
        if (message == 'Inavlid Email !!') {
            setErrorMessageEmail(message);
            setErrorMessagePass(null);
            document.getElementById('email').focus();
            return;
        }
        else if (message == 'Inavlid Password !!') {
            setErrorMessagePass(message);
            setErrorMessageEmail(null);
            document.getElementById('pass').focus();
            return;
        }
        else {
            setErrorMessageEmail(null);
            setErrorMessagePass(null);
        }

        if(!isSignIn){
            // SIGN UP LOGIC 
        }
        else{
            // SIGN IN LOGIC 
        }


    }

    return (
        <div className="login-clean">
            <img height='80px' className="Netflixlogo" src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="logo" srcSet="" />
            <form onSubmit={(e) => e.preventDefault()}>
                <h2 className="sr-only" style={{ color: 'white' }}>{isSignIn ? 'Sign In' : 'Sign Up'}</h2>
                {/* {!isSignIn && <div className="form-group"><input className="form-control" type="text" name="text" placeholder="User Name" /></div>} */}
                <div className="form-group"><input id="email" ref={email} className="form-control" type="text" name="email" placeholder="Email" /><p className="errormessage">{errorMessageEmail}</p></div>
                <div className="form-group"><input id="pass" ref={password} className="form-control" type="password" name="password" placeholder="Password" /><p className="errormessage">{errorMessagePass}</p></div>
                <div className="form-group"><button className="btn btn-primary btn-block" onClick={handleSignIn}>{isSignIn ? 'Sign In' : 'Sign Up'}</button></div>
                <p className="forgot" onClick={toggleForm}>{isSignIn ? 'New to Netflix? Sign up now.' : 'Already a user? Sign In now'}</p>
            </form>
        </div>
    )
}

export default Login;