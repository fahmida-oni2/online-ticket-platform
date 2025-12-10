import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Loading from "../Components/Loading/Loading";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Tickets from "../Pages/Tickets/Tickets";
import Dashboard from "../Pages/Dashboard/Dashboard";
import PrivateRoutes from "./PrivateRoutes";
import AuthLayouts from "../Components/AuthLayouts/AuthLayouts";
import Login from "../Components/Login/Login";
import Register from "../Components/Register/Register";
import MyProfile from "../Pages/MyProfile/MyProfile";
import Contact from "../Pages/LinkedPages/Contact";
import About from "../Pages/LinkedPages/About";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage></ErrorPage>,
    hydrateFallbackElement: <Loading></Loading>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/tickets",
        element: <PrivateRoutes>
            <Tickets></Tickets>
          </PrivateRoutes>,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoutes>
            <Dashboard></Dashboard>
          </PrivateRoutes>
        ),
      },
       {
        path: "/profile",
        element: (
          <PrivateRoutes>
           <MyProfile></MyProfile>
          </PrivateRoutes>
        ),
      },
       {
            path: "/contact",
            element: <Contact></Contact>,
          },
           {
            path: "/about",
            element: <About> </About>,
          },
      {
        path: "/auth",
        element: <AuthLayouts></AuthLayouts>,
        children: [
          {
            path: "/auth/login",
            element: <Login></Login>,
          },
          {
            path: "/auth/register",
            element: <Register></Register>,
          },
        ],
      },
    ],
  },
]);
