import React, { use, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import userImg from '../../assets/user.png'
import toast, { Toaster } from 'react-hot-toast';
import Loading from '../../Components/Loading/Loading';
import useRole from '../../Hooks/useRole';
import { FaUserEdit, FaEnvelope, FaIdBadge, FaCamera } from 'react-icons/fa';

const MyProfile = () => {
    const { role } = useRole();
    const { user, loading, updateUser, setUser } = use(AuthContext);
    const [isUpdating, setIsUpdating] = useState(false);
    const [newName, setNewName] = useState(user?.displayName || '');
    const [newPhotoURL, setNewPhotoURL] = useState(user?.photoURL || '');

    const handleUpdateSubmit = (e) => {
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
                toast.error('Failed to update profile: ' + error.message);
            });
    };

    if (loading) return <Loading />;
    if (!user) return <div className="p-10 text-center font-black text-primary uppercase">Please log in to view your profile.</div>;

    const displayName = user.displayName || 'User Name Not Set';
    const email = user.email || 'Email Not Available';
    const userImage = user.photoURL ? user.photoURL : userImg;

    return (
        <div className="animate__animated animate__fadeIn">
            {/* Profile Header Card */}
            <div className="relative mb-10 overflow-hidden rounded-[2rem] bg-primary p-8 text-white shadow-lg shadow-primary/20">
                <div className="relative z-10 flex flex-col items-center gap-6 md:flex-row">
                    {/* Image Section */}
                    <div className="relative group">
                        <img
                            src={userImage}
                            alt={displayName}
                            className="h-32 w-32 rounded-full border-4 border-accent object-cover shadow-xl transition-transform group-hover:scale-105 md:h-40 md:w-40"
                        />
                        <div className="absolute bottom-2 right-2 rounded-full bg-accent p-2 text-white shadow-lg">
                            <FaCamera size={16} />
                        </div>
                    </div>

                    {/* Text Info */}
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-3xl font-black uppercase tracking-tighter md:text-4xl">
                            {displayName}
                        </h1>
                        <div className="mt-4 space-y-2 text-white/80">
                            <p className="flex items-center justify-center gap-2 text-[12px] font-bold  tracking-widest md:justify-start">
                                <FaEnvelope className="text-accent" /> {email}
                            </p>
                            <p className="flex items-center justify-center gap-2 text-[12px] font-bold uppercase tracking-widest md:justify-start">
                                <FaIdBadge className="text-accent" /> Account Role: <span className="text-accent">{role}</span>
                            </p>
                        </div>
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={() => setIsUpdating(true)}
                        className="btn border-none bg-accent px-8 font-black uppercase tracking-widest text-white hover:bg-white hover:text-primary transition-all rounded-xl"
                    >
                        <FaUserEdit /> Edit Profile
                    </button>
                </div>
  
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5"></div>
                <div className="absolute -bottom-10 right-20 h-24 w-24 rounded-full bg-accent/10"></div>
            </div>

            {/* Update Form Modal-style Overlay */}
            {isUpdating && (
                <div className="rounded-[2rem] border border-base-300 bg-white p-8 shadow-2xl animate__animated animate__zoomIn">
                    <div className="mb-6 border-b border-base-200 pb-4">
                        <h2 className="text-xl font-black uppercase tracking-widest text-primary">
                            Update <span className="text-accent">Credentials</span>
                        </h2>
                    </div>
                    
                    <form onSubmit={handleUpdateSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/50 ml-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                className="input input-bordered w-full rounded-xl border-base-300 font-bold focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/50 ml-1">
                                Photo URL
                            </label>
                            <input
                                type="text"
                                placeholder="https://image-link.com"
                                value={newPhotoURL}
                                onChange={(e) => setNewPhotoURL(e.target.value)}
                                className="input input-bordered w-full rounded-xl border-base-300 font-bold focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                            />
                        </div>

                        <div className="col-span-full flex-col-reverse lg:flex items-center gap-4 pt-4 md:justify-end">
                            <button 
                                type="button" 
                                onClick={() => setIsUpdating(false)} 
                                className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-primary/40 hover:text-red-500 transition-colors"
                            >
                                Discard Changes
                            </button>
                            <button 
                                type="submit" 
                                className="rounded-xl bg-primary px-10 py-3 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-primary/20 hover:bg-accent transition-all"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <Toaster position="top-right" />
        </div>
    );
}

export default MyProfile;