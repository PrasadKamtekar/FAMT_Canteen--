import { useEffect, useMemo, useState } from "react";
import SubPageHeader from "../componet/Dashboard/userDash/SubPageHeader.jsx";
import { getUserProfile, updateUserProfile } from "../utils/firebaseUtils.js";
import { useAuth } from "../context/AuthContext.jsx";
import toast from "react-hot-toast";

function Profile() {
    const { currentUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [imageFile, setImageFile] = useState(null);
    
    // Determine display name fallback
    const displayName = currentUser?.displayName || currentUser?.email?.split('@')[0] || "";

    const [profile, setProfile] = useState({
        username: displayName,
        email: currentUser?.email || "",
        profileImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300"
    });

    useEffect(() => {
        async function fetchProfile() {
            if (currentUser?.uid) {
                try {
                    const data = await getUserProfile(currentUser.uid);
                    if (data) {
                        setProfile(prev => ({
                            ...prev,
                            username: data.username || prev.username,
                            profileImage: data.profileImage || prev.profileImage
                        }));
                    }
                } catch (error) {
                    console.error("Error fetching profile", error);
                }
            }
            setLoading(false);
        }
        fetchProfile();
    }, [currentUser]);

    const canSave = useMemo(() => profile.username.trim().length > 0, [profile.username]);

    const handleImageUpload = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        setImageFile(file); // save file to pass to firebase
        const reader = new FileReader();
        reader.onload = () => {
            // update local preview immediately
            setProfile((prev) => ({ ...prev, profileImage: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    const handleSave = async () => {
        if (!canSave) {
            toast.error("Username is required.");
            return;
        }

        try {
            toast.loading("Saving profile...", { id: "profile" });
            await updateUserProfile(currentUser.uid, {
                username: profile.username.trim(),
                email: profile.email.trim(),
                profileImage: profile.profileImage // Will be replaced if imageFile exists
            }, imageFile);
            
            toast.success("Profile updated successfully", { id: "profile" });
            setIsEditing(false);
            setImageFile(null);
        } catch (error) {
            toast.error("Failed to save profile.", { id: "profile" });
        }
    };

    return (
        <>
            <SubPageHeader page="profile" />
            {/** profile container */}
            <div className="bg-[#eeeef1] min-h-[calc(100dvh-90px)] px-4 py-8">
                <div className="w-full flex justify-center">
                    <div className="bg-[#ffffff] w-full max-w-xl rounded-xl shadow-md p-5 sm:p-7">
                        <div className="w-full flex justify-end">
                            <button
                                onClick={() => setIsEditing((prev) => !prev)}
                                className='text-sm sm:text-base tracking-wider font-medium text-gray-700'
                            >
                                {isEditing ? "Cancel" : "Edit"}
                            </button>
                        </div>
                        <div className="w-full flex flex-col items-center mt-2 mb-4">
                            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-[#FBA808]">
                                <img
                                    src={profile.profileImage}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {isEditing && (
                                <label className="mt-3 text-sm text-[#0F6657] font-medium cursor-pointer">
                                    Change Profile Photo
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageUpload}
                                    />
                                </label>
                            )}
                        </div>
                        <div className="flex flex-col justify-center items-center gap-3 w-full">
                            <div className='w-full'>
                                <h1 className="text-sm sm:text-base font-[400] text-gray-500 mb-1">Username</h1>
                                <input
                                    type="text"
                                    value={profile.username}
                                    disabled={!isEditing}
                                    onChange={(e) => setProfile((prev) => ({ ...prev, username: e.target.value }))}
                                    className="bg-gray-200 w-full px-3 py-2 text-sm sm:text-base rounded-lg outline-none disabled:opacity-80"
                                />
                            </div>
                            <div className='w-full'>
                                <h1 className="text-sm sm:text-base font-[400] text-gray-500 mb-1">Email</h1>
                                <input
                                    type="text"
                                    value={profile.email}
                                    disabled
                                    className="bg-gray-200 w-full px-3 py-2 text-sm sm:text-base rounded-lg outline-none disabled:opacity-80 cursor-not-allowed"
                                />
                            </div>

                        </div>
                        {isEditing && (
                            <div className="flex justify-center mt-5">
                                <button
                                    onClick={handleSave}
                                    className="bg-[#FBA808] text-white tracking-wider font-medium text-sm sm:text-base px-6 py-2 rounded-lg"
                                >
                                    Save
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
