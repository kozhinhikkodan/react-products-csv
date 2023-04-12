import React, { useState } from "react";
import axios from "axios";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { useNavigate, Link } from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_BASE_URL;

export const Register = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [ConfirmPass, setConfirmPass] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);

    axios
      .post(`${apiUrl}user/register`, {
        email,
        password: pass,
        c_password: ConfirmPass,
        name,
      })
      .then((response) => {
        if (response.status === 200) {
          toastr.success("Registration successful", "", {
            onHidden: () => {
              navigate("/login");
            },
          });
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

  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Full name</label>
        <input
          value={name}
          name="name"
          onChange={(e) => setName(e.target.value)}
          id="name"
          placeholder="full Name"
        />
        {errors.name && <div className="error">{errors.name}</div>}
        <label htmlFor="email">E mail</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
        />
        {errors.email && <div className="error">{errors.email}</div>}
        <label htmlFor="password">Password</label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        {errors.password && <div className="error">{errors.password}</div>}
        <label htmlFor="password">Confirm Password</label>
        <input
          value={ConfirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          type="password"
          placeholder="********"
          id="c_password"
          name="c_password"
        />
        {errors.c_password && <div className="error">{errors.c_password}</div>}
        <button type="submit">Register</button>
      </form>
      <Link to="/login" className="link-btn">
        Already have an account? Login here.
      </Link>
    </div>
  );
};
