import React, {useEffect} from 'react'
import {useCookies} from "react-cookie";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import "../styles/userProfile.scss";

const UserProfile = () => {

    const [cookies, setCookies, removeCookies] = useCookies();
    const navigate = useNavigate();

    const checkJWT = async () => {
        const jwt = cookies.jwt
        try {
            const {res} = await axios.post("http://localhost:8080/users/checkJWT",
                {}, {headers: {'Authorization': `Bearer ${cookies.jwt}`}});
        } catch (e) {
            logout()
            navigate("/login")
        }
    }

    const logout = () => {
        removeCookies("jwt")
        removeCookies("firstName")
        removeCookies("userName")
        navigate("/")
    }

    useEffect(() => {
        checkJWT();
    }, [])

    return (
        <div className="container">
            <div className="username">
                <h2>Hello, {cookies.firstName}</h2>
            </div>
            <div className="user-links">
                <Link to={"/viewOrders"}>View Orders</Link>
                <Link to={"/contactSupport"}>Contact Support</Link>
            </div>
            <button onClick={logout} className="logout-button">Logout</button>
        </div>
    )
}

export default UserProfile