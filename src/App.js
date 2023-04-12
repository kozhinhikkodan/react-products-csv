import React, { useState } from "react";
import "./App.css";
import AuthContext from "./AuthContext";
import { RouterProvider, Routes, createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import { Login } from "./Login";
import { Register } from "./Register";
import Dashboard from "./Dashboard";
import ProductsListPage from "./ProductsListPage";
import ProductsImportForm from "./ProductsImportForm";

function App() {
  const [authResponse, setAuthResponse] = useState(
    localStorage.getItem("authResponse") != null
      ? JSON.parse(localStorage.getItem("authResponse"))
      : null
  );

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { index: true, element: <Login /> },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "products-list",
          element: <ProductsListPage />,
        },
        {
          path: "products-import",
          element: <ProductsImportForm />,
        },
        {
          path: "logout",
          element: <ProductsImportForm />,
        },
      ],
    },
  ]);

  return (
    <AuthContext.Provider value={{ authResponse, setAuthResponse }}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
