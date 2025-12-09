import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import Loading from '../Components/Loading/Loading';
import { Outlet, useNavigation } from 'react-router';
import Footer from '../Components/Footer/Footer';

const Root = () => {
     const { state } = useNavigation();
    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar></Navbar>
            <section>
                {
                state=="loading" ? <Loading></Loading> :<Outlet></Outlet>
            }
             
            </section>
            <Footer></Footer>
            
        </div>
    );
};

export default Root;