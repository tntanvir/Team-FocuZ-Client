import React, { useEffect, useState } from 'react';
import { FaUserCircle, FaSyncAlt } from "react-icons/fa";

const Navber = () => {
    const [user, setUser] = useState(null);

    const fetchProfile = async () => {
        const token = sessionStorage.getItem("access");
        if (!token) return;
        console.log(token)

        try {
            const res = await fetch("https://team-focu-z-backend.vercel.app/auth/profile/", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                throw new Error("Failed to fetch user data");
            }

            const data = await res.json();
            setUser(data);
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <div className="flex text-black justify-between items-center p-4 bg-white shadow-md">
            <h2 className="text-2xl font-bold text-blue-800">Team FocuZ</h2>

            <div className="flex items-center gap-4">
                <span className="flex items-center gap-2 font-semibold">
                    {user?.ProfilePicture ? (
                        <img
                            src={user.ProfilePicture}
                            alt="Profile"
                            className="w-8 h-8 rounded-full object-cover"
                        />
                    ) : (
                        <FaUserCircle size={24} />
                    )}
                    {user?.username || "লোড হচ্ছে..."}{" "}
                    <span className="text-sm text-gray-500">({user?.role})</span>
                </span>

                <FaSyncAlt
                    className="text-gray-500 cursor-pointer hover:text-blue-500 transition"
                    onClick={fetchProfile}
                    title="Refresh Profile"
                />
            </div>
        </div>
    );
};

export default Navber;
