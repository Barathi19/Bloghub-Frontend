import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { Outlet, useNavigate } from "react-router-dom";
import Loader from "../components/loader/Loader";

function PrivateRouter() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      navigate("/login");
    } else {
      setIsAuthenticated(true);
    }

    setIsLoading(false);
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="auth-loader">
        <Loader />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export default PrivateRouter;
