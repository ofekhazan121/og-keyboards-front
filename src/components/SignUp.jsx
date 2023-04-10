import React, { useState } from "react";
import "../styles/register.scss";
import "../index.scss";
import axios from "axios";
import { Link, useHref } from "react-router-dom";


function SignUp() {

  const [authUser, setAuthUser] = useState({
    userName: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
  });

  const signUpUser = async () => {
    try {
      await axios.post("http://localhost:8080/users/signup", authUser);
    } catch (err) {
      console.log(err);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setAuthUser({ ...authUser, [name]: value });
    console.log(authUser);
  };


  return (
    <div className="register-container">
      <h1>Sign-Up</h1>
      <form className="register-form">
        <input type="text" required autoComplete="username" name="userName" placeholder="userName" value={authUser.userName} onChange={handleInput}/>
        <input type="password" required autoComplete="current-password" name="password" placeholder="password" value={authUser.password} onChange={handleInput}/>
        <input type="email" required name="email" placeholder="email" value={authUser.email} onChange={handleInput}/>
        <input type="text" required name="firstName" placeholder="first name" value={authUser.firstName} onChange={handleInput}/>
        <input type="text" required name="lastName" placeholder="last name" value={authUser.lastName} onChange={handleInput}/>
        <br></br>
        <button className="product-button" onClick={() => signUpUser()}>Register</button>
        <Link to={"/login"}>Already got Account? Login</Link>
      </form>
    </div>
  );
}

export default SignUp;
