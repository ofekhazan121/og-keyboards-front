import React, {useContext, useState} from "react";
import "../styles/register.scss";
import "../index.scss";
import axios from "axios";
import {Link, useHref, useNavigate} from "react-router-dom";
import {CartContext} from "../context/CartContext.jsx";


function SignUp() {
    const cart = useContext(CartContext)
    const navigate = useNavigate();
    const [authUser, setAuthUser] = useState({
        userName: "",
        password: "",
        email: "",
        firstName: "",
        lastName: "",
    });

    const signUpUser = async () => {
        try {
            await axios.post("http://localhost:8080/users/signup", authUser)
                .then((res) => {
                    cart.notifySuccess(res.data)
                    navigate("/login")
                    console.log(res)
                })
        } catch (err) {
            console.log(err);
            cart.notifyError(err.message)
        }
    };

    const handleInput = (e) => {
        const {name, value} = e.target;
        setAuthUser({...authUser, [name]: value});
    };


    return (
        <div className="container">
            <div className="login-container">
                <div className="register-form">
                    <h1>Sign-Up</h1>
                    <input type="text" required autoComplete="username" name="userName" placeholder="userName"
                           value={authUser.userName} onChange={handleInput}/>
                    <input type="password" required autoComplete="current-password" name="password"
                           placeholder="password"
                           value={authUser.password} onChange={handleInput}/>
                    <input type="email" required name="email" placeholder="email" value={authUser.email}
                           onChange={handleInput}/>
                    <input type="text" required name="firstName" placeholder="first name" value={authUser.firstName}
                           onChange={handleInput}/>
                    <input type="text" required name="lastName" placeholder="last name" value={authUser.lastName}
                           onChange={handleInput}/>
                    <br></br>
                    <button type="submit" onClick={() => signUpUser()}>Register</button>
                    <Link to={"/login"}>Already got Account? Login</Link>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
