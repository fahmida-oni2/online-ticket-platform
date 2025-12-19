import React, { use } from 'react';
import useRole from '../Hooks/useRole';
import { AuthContext } from '../Provider/AuthProvider';
import Loading from '../Components/Loading/Loading';

const AdminRoute = ({ children }) => {
    const { loading } = use(AuthContext);
    const { role, roleLoading } = useRole()

    if (loading || roleLoading) {
        return <Loading></Loading>
    }

    if (role !== 'admin') {
        return  <div className='text-4xl text-red-600 text-center'>Access is forbidden</div>
    }

    return children;
};

export default AdminRoute;