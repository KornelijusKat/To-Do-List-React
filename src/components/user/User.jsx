import { useAuthState } from "react-firebase-hooks/auth";
import { getUserData, auth, logout } from "../../services/AuthServices";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const User =()=>{
    const [user, loading] = useAuthState(auth);
    const [userData, setUserData] = useState({})
    const navigate = useNavigate();
    useEffect(()=>{
        if(loading) return;
        if(!user) navigate('/');
        getUserData(user, setUserData)
    },[user, loading])
    const handleClick = () =>{
        navigate('/addproject')
    }
    return(
        <div className="row nav-main">
            <div className="col nav-user">
                <div className="user-icon"></div>
                <div className="user-info">
                    <p>Hello,</p>
                    <h5>{userData.name}</h5>
                </div>
            </div>
            <div className="col nav-logout">
                <button className="btn user-logout me-1" onClick={handleClick}>Add Project</button>
                <button className="btn user-logout" onClick={logout}>Logout</button>
            </div>
        </div>
    )
}

export default User