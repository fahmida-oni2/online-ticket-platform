import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import errorImg from '../../assets/error-404.png';
import { Link } from 'react-router';
import Footer from '../../Components/Footer/Footer';
import { FaCompass, FaHome } from 'react-icons/fa';

const ErrorPage = () => {
    return (
        <div className='flex flex-col min-h-screen bg-white'>
            <Navbar />
            
            <main className='flex-grow flex flex-col items-center justify-center p-6 md:p-10'>
                <div className="max-w-2xl w-full text-center space-y-8 animate__animated animate__fadeIn">
                    
                    {/* Illustration Container */}
                    <div className="relative inline-block">
                        <img 
                            src={errorImg} 
                            alt="404 Error" 
                            className="w-64 md:w-80 mx-auto drop-shadow-2xl animate__animated animate__pulse animate__infinite animate__slow" 
                        />
                        <div className="absolute -top-4 -right-4 bg-accent text-primary p-3 rounded-full shadow-lg rotate-12">
                            <FaCompass size={24} />
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="space-y-3">
                        <h1 className="text-4xl md:text-6xl font-black text-primary uppercase tracking-tighter">
                            Lost your <span className="text-accent">Way?</span>
                        </h1>
                        <p className="text-secondary font-bold uppercase tracking-widest text-[11px] max-w-sm mx-auto leading-relaxed">
                            It looks like the destination you're looking for doesn't exist or the route has been changed.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Link 
                            to="/" 
                            className="w-full sm:w-auto px-10 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-accent hover:text-primary transition-all duration-300 flex items-center justify-center gap-2 group shadow-xl"
                        >
                            <FaHome className="group-hover:-translate-y-1 transition-transform" />
                            Return Home
                        </Link>
                        
                        <button 
                            onClick={() => window.history.back()}
                            className="w-full sm:w-auto px-10 py-4 bg-base-200 text-secondary rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-base-300 transition-all duration-300"
                        >
                            Previous Page
                        </button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ErrorPage;