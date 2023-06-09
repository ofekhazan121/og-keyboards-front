import React, {useContext, useState} from "react";
import '../styles/login.scss';
import { useCookies } from "react-cookie"
import {Link, useHref, useNavigate} from "react-router-dom";
import axios from "axios";
import {CartContext} from "../context/CartContext.jsx";



const Login = () => {

  const [cookie, setCookie, removeCookie] = useCookies(['user'])
  const navigate = useNavigate()
  const cart = useContext(CartContext)

  const [authUser, setAuthUser] = useState({
    userName: "",
    password: null,
  });

  const signIn = async (e) => {
    e.preventDefault()
    axios.post("http://localhost:8080/users/login", authUser)
    .then((response) => {
      saveCookie(response)
      navigate("/userProfile")
      cart.notifySuccess(`Welcome back ${response.data.firstName}`)
      console.log(response.data.workerId)
    })
    .catch(error => {
      cart.notifyError("Incorrect username or password")
      console.log("There Was an error!", error);
    })
    
  };

  

  const saveCookie = (response) => {

    if (response.data.role !== "CLIENT") {
      setCookie('jwt', response.data.jwt)
      setCookie('firstName', response.data.firstName)
      setCookie('userName', response.data.userName)
      setCookie('role', response.data.role)
      setCookie('workerId', response.data.id)
    }else {
      setCookie('jwt', response.data.jwt)
      setCookie('firstName', response.data.firstName)
      setCookie('userName', response.data.userName)
      setCookie('role', response.data.role)
    }

  }


  const handleInput = (e) => {
    const { name, value } = e.target;
    setAuthUser({ ...authUser, [name]: value });
  };

  return (
    <div className="login-container">
      <form>
        <h1>Login</h1>
        <label htmlFor="userName">Username:</label>
        <input type="text" id="userName" name="userName" onChange={handleInput}/>
        <br />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" onChange={handleInput}/>
        <br />
        <button type="submit"  onClick={signIn}>Login</button>
        <Link to={"/signup"}>Create Account</Link>
      </form>
    </div>
  );
}

export default Login;