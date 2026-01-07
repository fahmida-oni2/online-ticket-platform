import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Register = () => {
  const axiosSecure = useAxiosSecure();
  const [show, setShow] = useState(false);
  const { createUser, setUser, updateUser, signInWihGoogle } = use(AuthContext);
  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    //  console.log(e.target)
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;
    // console.log(email,name,photo,password)
    const regExp = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!regExp.test(password)) {
      toast.error(
        "Your password must be at least 6 characters long and contain at least one uppercase letter and at least one lowercase letter. Please ensure your password meets all these requirements before submitting."
      );
      return;
    }
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        // console.log(user)
        toast.success("SignUp Successfully");
        // 1. Update Profile in Firebase
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });

            const userInfo = {
              name: name,
              email: email,
              photoURL: photo,
              createdAt: new Date()
            };
            axiosSecure.post("/users", userInfo)
              .then((res) => {
                if (res.data.insertedId) {
                  toast.success("User created in database!");
                  navigate("/");
                }
              })
              .catch(err => console.error("Database error:", err));
          });
          })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  
  const handleGoogleSignIn = () => {
    signInWihGoogle()
      .then((result) => {
        const user = result.user;
        const userInfo = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        };
     axiosSecure.post("/users", userInfo)
          .then(() => {
            navigate(location.state || "/");
          });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div className="hero bg-base-200 min-h-screen ">
      <div className="hero-content flex-col lg:flex">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl text-sky-800 font-bold">Register Now!</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleRegister} className="card-body ">
            <fieldset className="fieldset">
              <label className="label ">Name</label>
              <input
                name="name"
                type="text"
                className="input"
             
                required
              />
              <label className="label ">Email</label>
              <input
                name="email"
                type="email"
                className="input"
           
                required
              />
              <label className="label ">Photo-URL</label>
              <input
                name="photo"
                type="photo"
                className="input"
               
                required
              />

              <label className="label ">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={show ? "text" : "password"}
                  className="input"
                
                  required
                />
                <span
                  onClick={() => setShow(!show)}
                  className="absolute right-2 top-3.5  cursor-pointer z-50 "
                >
                  {show ? (
                    <FaEye className="w-10 h-4"></FaEye>
                  ) : (
                    <IoEyeOff className="w-10 h-4"></IoEyeOff>
                  )}
                </span>
              </div>
              <button type="submit" className="btn bg-sky-800 text-white rounded-2xl mt-4 p-5 ">
                Register
              </button>
            </fieldset>
          </form>
          <button
            onClick={handleGoogleSignIn}
            className="btn rounded-2xl btn-primary text-white border-[#e5e5e5] p-5 m-6 mt-0 mb-0"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>
          <p className="mt-3 mb-5 font-semibold text-center">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-sky-800">
              Login
            </Link>
          </p>
        </div>
      </div>
      <Toaster></Toaster>
    </div>
  );
};

export default Register;
