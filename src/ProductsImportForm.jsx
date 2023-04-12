import React from "react";
import { useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import axios from "axios";
import NavigationBar from "./NavigationBar";
import { Navigate, useNavigate } from "react-router-dom";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
const apiUrl = process.env.REACT_APP_API_BASE_URL;

function ProductsImportForm() {
  const { authResponse } = useContext(AuthContext);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    axios
      .post(`${apiUrl}products`, formData, {
        headers: {
          Authorization: `Bearer ${authResponse.token}`,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          toastr.success("Import successful", "", {
            onHidden: () => {
              navigate("/products-list");
            },
          });
        }
      })
      .catch((error) => {
        setErrors([]);
        if (error.response && error.response.status === 422) {
          setErrors(error.response.data.data.errors);
          console.log(error.response.data.data.errors);
        } else {
          console.log(error);
        }
      });
  };

  return authResponse && authResponse.token ? (
    <div>
      <NavigationBar />
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Import Products</h1>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input type="file" name="file" />
          <a href="./sample-products-import.csv" className="sample-link">
            Download Sample File
          </a>
        </div>

        <button className="import-btn">Import Products</button>
        {errors.file && <div className="error">{errors.file}</div>}
        {errors &&
          !errors.file &&
          errors.map((error, index) => (
            <div key={index}>
              <p>Error in row {error.row}:</p>
              <ul className="error">
                {error.errors.map((message, index) => (
                  <li key={index}>{message}</li>
                ))}
              </ul>
            </div>
          ))}
      </form>
    </div>
  ) : (
    <Navigate to="/login" />
  );
}

export default ProductsImportForm;
