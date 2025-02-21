import Header from "./Header"
import { useSelector } from "react-redux";

const Profile = () => {
    const users = useSelector((store) => store.user);
    console.log(users);
    
    return (
        <>
            <Header />
            <h1>1 . {users?.name}</h1>
            <h1>2 . {users?.verified ? 'verified' : 'not verified'}</h1>
            <h1>3 . {users?.email}</h1>
            <h1>3 . {users?.phone}</h1>
        </>
    )
}
export default Profile