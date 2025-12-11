import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root/Root";
import Loading from "../Components/Loading/Loading";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Tickets from "../Pages/Tickets/Tickets";
import PrivateRoutes from "./PrivateRoutes";
import AuthLayouts from "../Layouts/AuthLayouts/AuthLayouts";
import Login from "../Components/Login/Login";
import Register from "../Components/Register/Register";
import MyProfile from "../Pages/MyProfile/MyProfile";
import Contact from "../Pages/LinkedPages/Contact";
import About from "../Pages/LinkedPages/About";
import MyTickets from "../Pages/Dashboard/MyTickets/MyTickets";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import TransHistory from "../Pages/Dashboard/TransHistory/TransHistory";

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
        element: (
          <PrivateRoutes>
            <Tickets></Tickets>
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
    ],
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

  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayout></DashboardLayout>
      </PrivateRoutes>
    ),

    children: [
      {
        path: "my-tickets",
        element: <MyTickets></MyTickets>,
      },
      {
        path: "trans-history",
        element: <TransHistory></TransHistory>,
      },
    ],
  },
]);
