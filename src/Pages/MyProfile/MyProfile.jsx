import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import userImg from '../../assets/user.png'
import toast, { Toaster } from 'react-hot-toast';
import Loading from '../../Components/Loading/Loading';

const MyProfile = () => {
    const [enrolled, setEnrolled] = useState([]);
    const {user,loading, updateUser,setUser} = use(AuthContext);
    const [isUpdating, setIsUpdating] = useState(false);
    const [newName, setNewName] = useState(user?.displayName || '');
    const [newPhotoURL, setNewPhotoURL] = useState(user?.photoURL || '');
     useEffect(() => {
    const savedSkills = JSON.parse(localStorage.getItem('enroll'));
    if (savedSkills) {
      setEnrolled(savedSkills);
    }
  }, []);
    if (loading) {
        return <Loading></Loading>; 
    }
    if (!user) {
        return <div>Please log in to view your profile.</div>;
    }
    const displayName = user.displayName || 'User Name Not Set';
    const email = user.email || 'Email Not Available';
    const userImage = user.photoURL ? user.photoURL : userImg;
   


    const handleUpdateSubmit =(e)=>{
         e.preventDefault();
         const updateData = {};
        if (newName && newName !== user.displayName) {
            updateData.displayName = newName;
        }
        if (newPhotoURL && newPhotoURL !== user.photoURL) {
            updateData.photoURL = newPhotoURL;
        }
        
        if (Object.keys(updateData).length === 0) {
            toast.success('No changes detected.'); 
            setIsUpdating(false);
            return;
        }
      
        updateUser(updateData)
            .then(() => {
                setUser({ ...user, ...updateData });
                setIsUpdating(false);
                toast.success('Profile updated successfully!'); 
            })
            .catch((error) => {
                // console.error("Profile update error:", error);
                toast.error('Failed to update profile: ' + error.message); 
            });

    };
     const handleRemove = (skillId) => {
const existing = JSON.parse(localStorage.getItem('enroll')) || [];
const updated = existing.filter((s) => String(s.skillId) !== String(skillId));
setEnrolled(updated);
localStorage.setItem('enroll', JSON.stringify(updated));
toast.success('Ticket has been removed from your booking list.');

  };

    return (
       <div className=" bg-base-200 min-h-screen">
           <section>
             <div className=" grid grid-cols-1 space-y-5 ">
                <div className='flex justify-center items-center m-5'>
                    <img
                    src={userImage}
                    alt={displayName}
                    className="rounded-full shadow-2xlr"
                /></div>
                <div className='flex flex-col items-center'>
                    <h1 className="text-3xl font-bold text-center">{displayName}</h1>
                    <h3 className='text-xl font-bold mb-4'>Email: {email}</h3>
                    <div className='flex items-center justify-center'>
                        <button 
                            onClick={() => setIsUpdating(true)} 
                            className="btn bg-sky-800 text-white rounded-2xl"
                        >
                            Update your profile
                        </button>
                    </div>

                    {isUpdating && (
                        <div className="mt-8 p-6 bg-white shadow-lg rounded-lg w-full max-w-sm">
                            <h2 className='text-2xl font-bold mb-4'>Update Profile</h2>
                            <form onSubmit={handleUpdateSubmit} className='space-y-4'>
                                <div>
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter new name"
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                        className="input input-bordered w-full"
                                    />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="label-text">Photo URL</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter new photo URL"
                                        value={newPhotoURL}
                                        onChange={(e) => setNewPhotoURL(e.target.value)}
                                        className="input input-bordered w-full"
                                    />
                                </div>

                                
                                <div className='flex justify-between pt-2'>
                                    <button type="submit" className="btn btn-success">Save Changes</button>
                                    <button 
                                        type="button" 
                                        onClick={() => setIsUpdating(false)} 
                                        className="btn btn-ghost"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
           </section>
            <section className="w-full">
        <div className="pt-10">
          <h1 className="text-[#001931] text-3xl font-bold text-center py-2">
            Your Booking Tickets
          </h1>
          <p className="text-[#627382] text-center">
            View and manage the tickets you are booking.
          </p>
        </div>

        <div className="space-y-3 p-5">
          {enrolled.length > 0 ? (
            enrolled.map((s) => (
              <div
                key={s.skillId}
                className="card card-side bg-base-100 shadow-sm grid lg:flex"
              >
                <figure className="mr-5 w-40 h-40">
                  <img
                    className="p-3 flex items-center object-cover"
                    src={s.image}
                    alt={s.skillName}
                  />
                </figure>

                <div className="card-body">
                  <h1 className="font-bold text-xl">{s.skillName}</h1>
                  <p className="text-sm text-gray-600">
                    Provided by: <span className="font-semibold">{s.providerName}</span>
                  </p>
                  <p className="text-sm text-gray-600">Category: {s.category}</p>
                </div>

                <div className="flex items-center pr-5">
                  <button
                    onClick={() => handleRemove(s.skillId)}
                    className="btn bg-sky-800 rounded-2xl text-white"
                  >
                    Unenroll
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-lg mt-10">
              You haven’t booked  any tickets yet.
            </p>
          )}
        </div>
              </section>
             <Toaster></Toaster>
        </div>
        
    );
}
export default MyProfile;