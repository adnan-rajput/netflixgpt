import { useRef, useState , useEffect } from "react";
import { validateSignIn } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword , onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeuser } from "../utils/userSlice";



const Login = () => {

    const [isSignIn, setIsSignIn] = useState(true)
    const [errorMessageEmail, setErrorMessageEmail] = useState(null);
    const [errorMessagePass, setErrorMessagePass] = useState(null);
    const [errorMessageName, setErrorMessageName] = useState(null);
    const [errorMessageFirebase, setErrorMessageFirebase] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                console.log(uid);
                dispatch(addUser({ email: user.email, verified: user.emailVerified, name: user.displayName }));
                navigate('/browse');

            } else {
                dispatch(removeuser());
                console.log("Loged Out");
            }
        });
    }, []);


    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);

    const toggleForm = () => {
        setIsSignIn(!isSignIn);
    }
    const handleSignIn = (e) => {

        // VALIDATION FOR NAME 
        if (name.current == null) {
        }
        else if (name.current.value == '') {
            setErrorMessageName('Enter UserName');
            document.getElementById("name").focus();
            return;
        }

        // VALIDATIONS FOR EMAIL AND PASSWORD 
        const message = validateSignIn(email.current.value, password.current.value);
        if (message == 'Inavlid Email !!') {
            setErrorMessageEmail(message);
            setErrorMessagePass(null);
            setErrorMessageName(null);
            document.getElementById('email').focus();
            return;
        }
        else if (message == 'Inavlid Password !!') {
            setErrorMessagePass(message);
            setErrorMessageEmail(null);
            setErrorMessageName(null);
            document.getElementById('pass').focus();
            return;
        }
        else {
            setErrorMessageEmail(null);
            setErrorMessagePass(null);
        }

        if (!isSignIn) {
            // SIGN UP LOGIC 
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user);
                    setErrorMessageFirebase(null)

                    // IF SIGN UP IS SUCCESSFULL THEN UPDATE NAME ALONG 
                    updateProfile(auth.currentUser, {
                        displayName: name.current.value, photoURL: "https://example.com/jane-q-user/profile.jpg"
                    }).then(() => {
                        // ADDING USER DATA TO REDUX STORE 
                        dispatch(addUser({ email: user.email, verified: user.emailVerified, name: user.displayName , phone : user.phoneNumber }));
                        navigate("/Browse");
                    }).catch((error) => {
                        // An error occurred
                        // ...
                    });


                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessageFirebase(errorCode)

                });
        }
        else {
            // SIGN IN LOGIC 
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user);
                    setErrorMessageFirebase(null)
                    // ADDING USER DATA TO REDUX STORE
                    dispatch(addUser({ email: user.email, verified: user.emailVerified, name: user.displayName , phone : user.phoneNumber }));
                    navigate("/Browse");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessageFirebase(errorCode)
                });
        }
    }

    return (
        <div className="login-clean">
            <img height='80px' className="Netflixlogo" src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="logo" srcSet="" />
            <form onSubmit={(e) => e.preventDefault()}>
                <h2 className="sr-only" style={{ color: 'white' }}>{isSignIn ? 'Sign In' : 'Sign Up'}</h2>
                {!isSignIn && <div className="form-group"><input id="name" ref={name} className="form-control" type="text" name=" User Name" placeholder="Name" /><p className="errormessage">{errorMessageName}</p></div>}
                <div className="form-group"><input id="email" ref={email} className="form-control" type="text" name="email" placeholder="Email" /><p className="errormessage">{errorMessageEmail}</p></div>
                <div className="form-group"><input id="pass" ref={password} className="form-control" type="password" name="password" placeholder="Password" /><p className="errormessage">{errorMessagePass}</p><p className="errormessage">{errorMessageFirebase}</p></div>
                <div className="form-group"><button className="btn btn-primary btn-block" onClick={handleSignIn}>{isSignIn ? 'Sign In' : 'Sign Up'}</button></div>
                <p className="forgot" onClick={toggleForm}>{isSignIn ? 'New to Netflix? Sign up now.' : 'Already a user? Sign In now'}</p>
            </form>
        </div>
    )
}

export default Login;