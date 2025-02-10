import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import store from "../utils/store";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

const Browse = () => {
    const navigate = useNavigate();
    const user = useSelector(store => store.user);

    // SIGNOUT BUTTON FUNCTIONALITY 
    const handleSignOut = () => {
        signOut(auth).then(() => {
            navigate("/");
        }).catch((error) => {
            alert("Unable to sign out");
        });
    }

    return <>
        <button onClick={handleSignOut}>Sign Out</button>
    </>
}
export default Browse; 