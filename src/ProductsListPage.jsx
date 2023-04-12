import React from "react";
import { useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import axios from "axios";
import NavigationBar from "./NavigationBar";
import { Navigate } from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_BASE_URL;

function ProductsListPage() {
  const { authResponse } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    authResponse &&
      authResponse.token &&
      axios
        .get(`${apiUrl}products`, {
          headers: {
            Authorization: `Bearer ${authResponse.token}`,
          },
        })
        .then((response) => {
          setProducts(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
  }, []);

  return authResponse && authResponse.token ? (
    <div>
      <NavigationBar />
      <h1>List of Products</h1>
      {!loading ? (
        <table>
          <thead className="table-header">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>SKU</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.product_name}</td>
                <td>{product.desctiption}</td>
                <td>{product.price}</td>
                <td>{product.sku}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading ...</p>
      )}
    </div>
  ) : (
    <Navigate to="/login" />
  );
}

export default ProductsListPage;
