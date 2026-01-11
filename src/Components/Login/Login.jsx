import React, { use, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaEye, FaArrowLeft } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const emailRef = useRef(null);
  const { signIn, signInWihGoogle, forgotPassword } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then(() => {
        toast.success("Welcome back to Ticket Hub!");
        navigate(location.state || "/");
      })
      .catch((error) => {
        setError(error.code);
        toast.error("Login failed. Please check your credentials.");
      });
  };

  const handleGoogleSignIn = () => {
    signInWihGoogle()
      .then(() => {
        toast.success("Securely logged in with Google");
        navigate(location.state || "/");
      })
      .catch(() => toast.error("Google authentication failed"));
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    if (!email) {
      toast.error("Please enter your email address first.");
      return;
    }
    forgotPassword(email)
      .then(() => toast.success("Reset link sent! Check your inbox."))
      .catch(() => toast.error("Failed to send reset email."));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4 transition-colors duration-300 overflow-x-hidden relative font-sans">



      <Link to="/" className="fixed top-20 left-6 z-[60]">
        <motion.button
          whileHover={{ x: -5 }}
          className="flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-widest bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-xl border border-base-300"
        >
          <FaArrowLeft /> Home
        </motion.button>
      </Link>

    
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 left-10 w-64 h-64 bg-primary/10 rounded-full blur-[60px]"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 right-10 w-80 h-80 bg-accent/15 rounded-full blur-[80px]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row bg-base-100 rounded-[2rem] lg:rounded-[2.5rem] shadow-2xl overflow-hidden max-w-5xl w-full border border-base-200 relative"
      >

        <div className="w-full lg:w-1/2 bg-primary p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden min-h-[250px] lg:min-h-auto">
     
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80')] opacity-30 bg-cover bg-center mix-blend-overlay"></div>
          
          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="https://i.ibb.co.com/kVR64Gmr/image.png"
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white p-1 transition-transform group-hover:scale-110 shadow-lg"
                alt="Logo"
              />
              <span className="text-white font-black text-xl lg:text-2xl tracking-tighter">TICKET HUB</span>
            </Link>
          </div>

          <div className="relative z-10 mt-8 lg:mt-0">
            <h2 className="text-white text-3xl lg:text-5xl font-black leading-tight mb-4 lg:mb-6">
              Your next journey starts here.
            </h2>
            <p className="text-white/80 text-sm lg:text-lg font-medium leading-relaxed max-w-md">
              Secure travel management for Bus, Rail, and Air. One platform, infinite destinations.
            </p>
          </div>

       
        </div>

        {/* Form Side */}
        <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center bg-base-100">
          <div className="mb-8 lg:mb-10 text-center lg:text-left">
            <h1 className="text-3xl lg:text-4xl font-black text-primary tracking-tight mb-2">Welcome Back</h1>
            <p className="text-secondary font-medium italic text-xs lg:text-sm">Sign in to access your dashboard.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5 lg:space-y-6">
            <div>
              <label className="block text-[10px] font-black text-primary uppercase tracking-widest mb-2 ml-1">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                ref={emailRef}
              
                className="w-full px-5 py-3 lg:py-4 rounded-xl lg:rounded-2xl border border-base-300 focus:ring-2 focus:ring-accent outline-none transition-all bg-base-200/50 font-bold text-sm lg:text-base"
                required
              />
            </div>

            <div className="relative">
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="text-[10px] font-black text-primary uppercase tracking-widest">
                  Password
                </label>
                <button
                  onClick={handleForgotPassword}
                  type="button"
                  className="text-[10px] font-bold text-accent hover:underline decoration-2"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <input
                  name="password"
                  type={show ? "text" : "password"}
             
                  className="w-full px-5 py-3 lg:py-4 rounded-xl lg:rounded-2xl border border-base-300 focus:ring-2 focus:ring-accent outline-none transition-all bg-base-200/50 font-bold text-sm lg:text-base"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40 hover:text-accent transition-colors p-2"
                >
                  {show ? <FaEye size={16} /> : <IoEyeOff size={16} />}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="text-red-500 text-[10px] font-black text-center bg-red-50 py-2 rounded-lg"
                >
                  {error === "auth/invalid-credential"
                    ? "Wrong email or password."
                    : "Login error. Check connection."}
                </motion.p>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full py-3 lg:py-4 bg-primary text-primary-content rounded-xl lg:rounded-2xl font-black text-base lg:text-lg shadow-xl shadow-primary/20 transition-all uppercase tracking-widest"
            >
              Sign In
            </motion.button>
          </form>

          {/* Social Divider */}
          <div className="relative my-6 lg:my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-base-300"></div>
            </div>
            <div className="relative flex justify-center text-[9px] uppercase font-black">
              <span className="bg-base-100 px-4 text-secondary/60">Quick Access</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.01, backgroundColor: "#f8fafc" }}
            whileTap={{ scale: 0.99 }}
            onClick={handleGoogleSignIn}
            className="w-full py-3 lg:py-4 border-2 border-base-300 rounded-xl lg:rounded-2xl flex items-center justify-center gap-3 font-bold text-base-content text-sm lg:text-base transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </motion.button>

          <p className="mt-8 lg:mt-10 text-center font-bold text-secondary text-xs lg:text-sm">
            New here? 
            <Link to="/auth/register" className="text-accent ml-2 hover:underline font-black">
              Register Now
            </Link>
          </p>
        </div>
      </motion.div>
      
      
    </div>
  );
};

export default Login;