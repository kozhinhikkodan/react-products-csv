import React, { useContext } from "react";
import {
  NavLink,
  useNavigate,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import AuthContext from "./AuthContext";

const apiUrl = process.env.REACT_APP_API_BASE_URL;

function NavigationBar() {
  const { authResponse, setAuthResponse } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    axios
      .post(`${apiUrl}user/logout`)
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem("authResponse");
          setAuthResponse(null);
          toastr.success("Logout successful");
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/products-list" activeclassname="active">
            Products List
          </NavLink>
        </li>
        <li>
          <NavLink to="/products-import" activeclassname="active">
            Products Import
          </NavLink>
        </li>
        <li>
          <button type="button" onClick={handleLogout} className="li-btn">
            Log Out
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationBar;
