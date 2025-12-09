import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Loading from "../Components/Loading/Loading";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement:<ErrorPage></ErrorPage>,
    hydrateFallbackElement: <Loading></Loading>,
    children:[
        {
            index: true,
            Component:Home
        },
    ]
       
    }  
      
     
]);