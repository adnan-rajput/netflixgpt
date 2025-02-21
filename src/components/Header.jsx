import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useEffect } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeuser } from "../utils/userSlice";
import { Link } from "react-router-dom";


const Header = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // SIGNOUT BUTTON FUNCTIONALITY 
    const handleSignOut = () => {
        if (confirm("Do You Want To Logout !!")) {
            signOut(auth).then(() => {
                navigate("/");
            }).catch((error) => {
                alert("Unable to sign out");
            });
        }

    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                console.log(user);
                dispatch(addUser({ email: user.email, verified: user.emailVerified, name: user.displayName , phone : user.phoneNumber }));

            } else {
                console.log("error");
                dispatch(removeuser());
                navigate("/")
            }
        });
    }, []);


    return (
        <>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/browse">
                        <img src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="" width="100" height="44" />
                    </Link>

                    <div className="btn-group dropstart">
                        <span style={{ paddingTop: '9px', color: 'white' }}>&#11164;</span>
                        <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            <img style={{ borderRadius: '15px' }} src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" width='30px' alt="profile img" srcSet="" />
                        </button>
                        <ul className="dropdown-menu">
                            <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                            <li><a className="dropdown-item" href="#">Password</a></li>
                            <li><button className="dropdown-item" onClick={handleSignOut}>Log Out</button></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Header;