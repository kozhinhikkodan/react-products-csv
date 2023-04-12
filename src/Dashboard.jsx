import { Navigate } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import ProductsListPage from "./ProductsListPage";
import AuthContext from "./AuthContext";
import { useContext } from "react";

function Dashboard() {
  const { authResponse } = useContext(AuthContext);

  return authResponse ? (
    <div>
      {/* <h1>Welcome to the dashboard</h1> */}
      {/* <NavigationBar /> */}
      <ProductsListPage />
    </div>
  ) : (
    <Navigate to="/login" />
  );
}

export default Dashboard;
