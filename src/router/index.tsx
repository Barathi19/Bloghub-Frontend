import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/landingPage";
import { ROUTES } from "../constant/route.constant";
import PrivateRouter from "../privateRouter";
import Blog from "../pages/blog/Blog";
import Login from "../pages/login/Login";
import Profile from "../pages/profile/Profile";
import Register from "../pages/register/Register";

const routes = createBrowserRouter([
  {
    path: ROUTES.landingPage,
    element: <LandingPage />,
  },
  {
    path: ROUTES.login,
    element: <Login />,
  },
  {
    path: ROUTES.register,
    element: <Register />,
  },
  {
    path: "/",
    element: <PrivateRouter />,
    children: [
      {
        path: ROUTES.blog,
        element: <Blog />,
      },
      {
        path: ROUTES.profile,
        element: <Profile />,
      },
    ],
  },
]);

export default routes;
