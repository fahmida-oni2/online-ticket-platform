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
import AddTickets from "../Pages/Dashboard/AddTickets/AddTickets";
import MyAddedTickets from "../Pages/Dashboard/MyAddedTickets/MyAddedTickets";
import ReqBookings from "../Pages/Dashboard/ReqBookings/ReqBookings";
import Revenue from "../Pages/Dashboard/Revenue/Revenue";
import ManageTickets from "../Pages/Dashboard/ManageTickets/ManageTickets";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import AdvertiseTickets from "../Pages/Dashboard/AdvertiseTickets/AdvertiseTickets";
import TicketDetails from "../Pages/TicketDetails/TicketDetails";

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
            path:'/all-tickets/:id',
           element: (
          <PrivateRoutes><TicketDetails></TicketDetails></PrivateRoutes>
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
    errorElement: <ErrorPage></ErrorPage>,
    hydrateFallbackElement: <Loading></Loading>,
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
    errorElement: <ErrorPage></ErrorPage>,
    hydrateFallbackElement: <Loading></Loading>,

    children: [
      {
        path: "profile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "my-tickets",
        element: <MyTickets></MyTickets>,
      },
      {
        path: "trans-history",
        element: <TransHistory></TransHistory>,
      },
      {
        path: "add-tickets",
        element: <AddTickets></AddTickets>,
        loader: () => fetch("/service.json"),
      },
      {
        path: "myAdded-tickets",
        element: <MyAddedTickets></MyAddedTickets>,
      },
      {
        path: "requested-bookings",
        element: <ReqBookings></ReqBookings>,
      },
      {
        path: "revenue",
        element: <Revenue></Revenue>,
      },
      {
        path: "manage-tickets",
        element: <ManageTickets></ManageTickets>,
      },
      {
        path: "manage-users",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: "advertise-tickets",
        element: <AdvertiseTickets></AdvertiseTickets>,
      },
       
    ],
  },
]);
