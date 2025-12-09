import React, { use } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import Loading from '../Components/Loading/Loading';

const PrivateRoutes = ({children}) => {
    const {user,loading} = use(AuthContext)
    const location = useLocation();
    // console.log(location)
    if(loading){
        return <Loading></Loading> 
    }
    if (user && user?.email){
        return children
    }
    return <Navigate state={location?.pathname} to='/auth/login'></Navigate>
}

export default PrivateRoutes;