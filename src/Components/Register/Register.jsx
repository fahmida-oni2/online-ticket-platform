import React, { use, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { FaEye, FaArrowLeft, FaUser, FaLink, FaSuitcase, FaBuilding } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Register = () => {
  const axiosSecure = useAxiosSecure();
  const [show, setShow] = useState(false);
  const [role, setRole] = useState("user"); 
  const { createUser, setUser, updateUser, signInWihGoogle } = use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    const regExp = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!regExp.test(password)) {
      toast.error("Password must be 6+ chars with Uppercase & Lowercase letters.");
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            
          
            const userInfo = {
              name: name,
              email: email,
              photoURL: photo,
              role: role, 
              createdAt: new Date(),
            };

            axiosSecure.post("/users", userInfo).then((res) => {
              if (res.data.insertedId) {
                toast.success(`Welcome to Ticket Hub as a ${role}!`);
                navigate("/");
              }
            });
          });
      })
      .catch((error) => toast.error(error.message));
  };

  const handleGoogleSignIn = () => {
    signInWihGoogle()
      .then((result) => {
        const user = result.user;
        const userInfo = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role: "user", 
        };
        
        axiosSecure.post("/users", userInfo).then(() => {
          toast.success("Joined with Google!");
          navigate(location.state || "/");
        });
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4 transition-colors duration-300 overflow-x-hidden relative font-sans">
      
    

      {/* Floating Home Button */}
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
          className="absolute top-10 right-10 w-64 h-64 bg-primary/10 rounded-full blur-[60px]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row bg-base-100 rounded-[2rem] lg:rounded-[2.5rem] shadow-2xl overflow-hidden max-w-5xl w-full border border-base-200 relative"
      >
 
        <div className="w-full lg:w-1/2 bg-primary p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden min-h-[200px] lg:min-h-auto text-white">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80')] opacity-30 bg-cover bg-center mix-blend-overlay"></div>
          
          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="https://i.ibb.co.com/kVR64Gmr/image.png"
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white p-1 shadow-lg"
                alt="Logo"
              />
              <span className="font-black text-xl lg:text-2xl tracking-tighter">TICKET HUB</span>
            </Link>
          </div>

          <div className="relative z-10 mt-4 lg:mt-0">
            <h2 className="text-3xl lg:text-5xl font-black leading-tight mb-2 lg:mb-4">
              Start your journey today.
            </h2>
            <p className="text-white/80 text-xs lg:text-lg font-medium leading-relaxed max-w-md">
              Join thousands of travelers booking their next adventure with confidence.
            </p>
          </div>
          <div className="hidden lg:block relative z-10 text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">
            <span>Fast Setup</span> • <span>Secure Data</span> • <span>Cloud Sync</span>
          </div>
        </div>

        {/* Form Side */}
        <div className="w-full lg:w-1/2 p-8 lg:p-10 flex flex-col justify-center bg-base-100">
          <div className="mb-6 text-center lg:text-left">
            <h1 className="text-3xl font-black text-primary tracking-tight mb-1">Create Account</h1>
            <p className="text-secondary font-medium italic text-xs">Join the Hub and explore the world.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            
            {/* ROLE SELECTION UI */}
            <div>
              <label className="block text-[10px] font-black text-primary uppercase tracking-widest mb-2 ml-1">Register As</label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setRole("user")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all font-black text-[10px] uppercase tracking-widest ${
                    role === "user" ? "border-accent bg-accent/10 text-accent shadow-md" : "border-base-300 text-secondary"
                  }`}
                >
                  <FaSuitcase /> Traveler
                </button>
                <button
                  type="button"
                  onClick={() => setRole("vendor")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all font-black text-[10px] uppercase tracking-widest ${
                    role === "vendor" ? "border-accent bg-accent/10 text-accent shadow-md" : "border-base-300 text-secondary"
                  }`}
                >
                  <FaBuilding /> Vendor
                </button>
              </div>
            </div>

            {/* Name Field */}
            <div>
              <label className="block text-[10px] font-black text-primary uppercase tracking-widest mb-1 ml-1">Full Name</label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 text-sm" />
                <input name="name" type="text" className="w-full pl-11 pr-5 py-3 rounded-xl border border-base-300 focus:ring-2 focus:ring-accent outline-none bg-base-200/50 font-bold text-sm" required />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-[10px] font-black text-primary uppercase tracking-widest mb-1 ml-1">Email</label>
              <div className="relative">
                <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 text-base" />
                <input name="email" type="email" className="w-full pl-11 pr-5 py-3 rounded-xl border border-base-300 focus:ring-2 focus:ring-accent outline-none bg-base-200/50 font-bold text-sm" required />
              </div>
            </div>

            {/* Photo URL Field */}
            <div>
              <label className="block text-[10px] font-black text-primary uppercase tracking-widest mb-1 ml-1">Photo URL</label>
              <div className="relative">
                <FaLink className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 text-sm" />
                <input name="photo" type="text" className="w-full pl-11 pr-5 py-3 rounded-xl border border-base-300 focus:ring-2 focus:ring-accent outline-none bg-base-200/50 font-bold text-sm"  />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-[10px] font-black text-primary uppercase tracking-widest mb-1 ml-1">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={show ? "text" : "password"}
                  className="w-full px-5 py-3 rounded-xl border border-base-300 focus:ring-2 focus:ring-accent outline-none bg-base-200/50 font-bold text-sm"
               
                  required
                />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40 hover:text-accent transition-colors">
                  {show ? <FaEye size={16} /> : <IoEyeOff size={16} />}
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full py-3.5 bg-primary text-primary-content rounded-xl font-black text-sm shadow-lg shadow-primary/20 transition-all uppercase tracking-widest"
            >
              Join the Hub
            </motion.button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-base-300"></div></div>
            <div className="relative flex justify-center text-[9px] uppercase font-black">
              <span className="bg-base-100 px-4 text-secondary/60">Alternative</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.01, backgroundColor: "#f8fafc" }}
            whileTap={{ scale: 0.99 }}
            onClick={handleGoogleSignIn}
            className="w-full py-3 border-2 border-base-300 rounded-xl flex items-center justify-center gap-3 font-bold text-base-content text-sm transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </motion.button>

          <p className="mt-6 text-center font-bold text-secondary text-xs">
            Already have an account? 
            <Link to="/auth/login" className="text-accent ml-2 hover:underline font-black">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;