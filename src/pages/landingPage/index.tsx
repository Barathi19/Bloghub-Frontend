import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../../constant/route.constant";

function LandingPage() {
  const [path, setPath] = useState("/");

  const nav = () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      const userInfo = JSON.parse(user);

      if (userInfo) setPath(ROUTES.blog);
    } else {
      setPath(ROUTES.login);
    }
  };

  useEffect(() => {
    nav();
  }, []);

  return <Navigate to={path} />;
}

export default LandingPage;
