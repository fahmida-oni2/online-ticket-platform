import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../Components/Firebase/firebase.config';
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export const AuthContext = createContext();
const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading]=useState(true)
    const createUser =(email,password) =>{
      setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const signIn =(email,password) => {
       setLoading(true);
    return signInWithEmailAndPassword (auth,email,password)
  }
   const signInWihGoogle = () => {
    setLoading (true);
    return signInWithPopup(auth,googleProvider)
     
  }

    const signOutUser =() => {
    return signOut (auth)
  }

  const updateUser = (updateData)=>{
    return updateProfile(auth.currentUser,updateData)
  }
  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth,email)
  }
    useEffect(()=>{
      const unsubscribe=  onAuthStateChanged(auth,(currentUser)=>{
          setUser(currentUser)
          setLoading(false)
        });
    return ()=>{
        unsubscribe()
    }
    },[])

 
    const authData = {
        user,
        setUser,
        createUser,
        signIn,
         signOutUser,
         loading,
         setLoading,
         signInWihGoogle,
         updateUser,
         forgotPassword,
    }
    return <AuthContext value={authData}>
        {children}
    </AuthContext>
};

export default AuthProvider;