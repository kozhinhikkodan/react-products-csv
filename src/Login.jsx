import React, { useState, useContext } from "react";
import { useNavigate, Routes, Route, Link, Navigate } from "react-router-dom";
import axios from "axios";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import AuthContext from "./AuthContext";
import Dashboard from "./Dashboard";
import { Register } from "./Register";
import App from "./App";

const apiUrl = process.env.REACT_APP_API_BASE_URL;

export const Login = (props) => {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [errors, setErrors] = useState([]);
  const { authResponse, setAuthResponse } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username);
    axios
      .post(`${apiUrl}user/login`, { name: username, password: pass })
      .then((response) => {
        if (response.status === 200) {
          //local storage
          localStorage.setItem(
            "authResponse",
            JSON.stringify(response.data.data)
          );
          setAuthResponse(response.data.data);
          toastr.success("Login successful");
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        setErrors([]);
        if (error.response && error.response.status === 422) {
          setErrors(error.response.data.data.errors);
        } else {
          console.log(error);
        }
      });
  };

  return !authResponse ? (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">User Name</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="User Name"
          id="username"
          name="username"
        />
        <label htmlFor="password">Password</label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        <button type="submit">Log In</button>
      </form>
      <Link to="/register" className="link-btn">
        Don't have an account? Register here.
      </Link>
    </div>
  ) : (
    <Navigate to="/dashboard" />
  );
};
