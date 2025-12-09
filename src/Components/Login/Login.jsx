import React, { use, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../Provider/AuthProvider';
import { FaEye } from 'react-icons/fa';
import { IoEyeOff } from 'react-icons/io5';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
   const [show,setShow]= useState(false)
  const [error,setError]=useState("");
    const emailRef = useRef(null);
    const {signIn,signInWihGoogle,forgotPassword} = use(AuthContext)
    const location =useLocation();
    const navigate = useNavigate();
    const handleLogin =(e)=>{
       e.preventDefault();
      //  console.log(e.target)
       const form = e.target;
        const email = form.email.value;
          const password = form.password.value;
          // console.log(email,password) 
          signIn(email,password)
          .then(result=>{
            const user = result.user;
            // console.log(user)
            toast.success('Logged in successfully')
            navigate (`${location.state? location.state :'/'}`)
           
            
          } )
          .catch((error) => {
            const errorcode = error.code ;
            setError(errorcode);
            toast.error('error')
    });
    };

     const handleGoogleSignIn = () =>{
          signInWihGoogle()
            .then(result => {
               toast.success('Logged in successfully')
             navigate(location.state || '/')
             
            })
            .catch(error => {
               toast.error('error')
            })
    }
    const handleForgotPassword=(e)=>{
      e.preventDefault();
      // console.log(emailRef.current.value)
      const email = emailRef.current.value
      forgotPassword(email)
       .then(result => {
             toast.success('check your email')
            })
            .catch(error => {
              toast.error('error')
            })

    }
    return (
       <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={handleLogin} className="card-body">
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input name='email' type="email" ref={emailRef} className="input" placeholder="Email" required />
        <div className='relative'>
          <label className="label">Password</label>
          <input  name='password' type={show?"text" :"password"}  className="input" placeholder="Password"  required />
          <span onClick={()=> setShow(!show)} className='absolute right-2 top-8  cursor-pointer z-50 '>{show ? <FaEye className='w-10 h-4'></FaEye> :<IoEyeOff className='w-10 h-4'></IoEyeOff> }</span>
           </div>
             <div>
               <button onClick={ handleForgotPassword} type='submit' className="link link-hover text-sm" >
                 Forgot password?
                </button>
    </div>
          {
            error && <p className='text-red-400 text-xs'>{error}</p>
          }
          <button type='submit' className="btn btn-neutral mt-4">Login</button>

        </fieldset>
      </form>
    <button onClick={handleGoogleSignIn} className="btn  btn-primary text-white border-[#e5e5e5]  m-6 mt-0 ">
  <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Login with Google
</button>
       
          <p className='mt-3 font-semibold text-center'>Don't have account? <Link to='/auth/register' className='text-blue-600'>Register</Link></p>
    </div>
  </div>
  <Toaster></Toaster>
</div>
  
    );
};

export default Login;