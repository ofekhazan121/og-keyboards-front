import React, { useState } from "react";
import '../styles/login.scss';
import { useCookies } from "react-cookie"
import { Link, useHref } from "react-router-dom";
import axios from "axios";



const Login = () => {

  const [cookie, setCookie, removeCookie] = useCookies(['user'])

  const [authUser, setAuthUser] = useState({
    userName: "",
    password: null,
  });

  const signIn = async (e) => {
    e.preventDefault()
    axios.post("http://localhost:8080/users/login", authUser)
    .then((response) => {
      saveCookie(response)
      console.log(response)
    })
    .catch(error => {
      console.log("There Was an error!", error);
    })
    
  };

  

  const saveCookie = (response) => {
    setCookie('jwt', response.data.jwt)
    setCookie('firstName', response.data.firstName)
    setCookie('userName', response.data.userName)
  }

  const deleteCookie = () => {
    removeCookie('jwt')
    removeCookie('firstName')
    removeCookie('userName')
  }

  const handleInput = (e) => {
    const { name, value } = e.target;
    setAuthUser({ ...authUser, [name]: value });
    console.log(authUser);
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
        <button type="submit"  onClick={signIn}>Submit</button>
        <Link to={"/signup"}>Create Account</Link>
      </form>
    </div>
  );
}

export default Login;