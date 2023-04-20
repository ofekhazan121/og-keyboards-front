import React, {useEffect} from 'react'
import {useCookies} from "react-cookie";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import "../styles/userProfile.scss";

const UserProfile = () => {

    const [cookies, setCookies, removeCookies] = useCookies();
    const navigate = useNavigate();

    const checkJWT = async () => {
        try {
            const {res} = await axios.post("http://192.168.1.119:8080/users/checkJWT",
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
        removeCookies("role")
        navigate("/")
    }

    useEffect(() => {
        checkJWT();
    }, [])

    return (
        <div className="container">
            {cookies.role === "ADMIN" || cookies.role === "WORKER" ? (
                <div className="admin-worker-page">
                    <div className="username">
                        <h2>Hello, {cookies.firstName}</h2>
                    </div>
                    {
                        cookies.role === "ADMIN" ?
                                <div className="admin-links">
                                    <Link to={"/viewAllOrders"}>View Orders</Link>
                                    <Link to={"/productManagement"}>Manage Products</Link>
                                </div> :
                                <div className="worker-links">
                                    <Link to={"/viewAllOrders"}>View Orders</Link>
                                </div>
                    }
                    <button onClick={logout} className="logout-button">Logout</button>
                </div>
                ) : (
                <div className="user-page">
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
        </div>
    )
}

export default UserProfile