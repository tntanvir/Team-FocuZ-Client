import React, { useContext, useEffect, useState } from 'react';
import { FaUserCircle, FaSyncAlt } from "react-icons/fa";
import { IoIosLogOut } from 'react-icons/io';
import { RiMenuFold2Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { DrawerContext } from '../Utils/SidebarContext';

const Navber = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const fetchProfile = async () => {
        const token = sessionStorage.getItem("access");
        if (!token) return;



        try {
            const res = await fetch("http://127.0.0.1:8000/auth/profile/", {
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

    const logoutUser = async () => {
        const refreshToken = sessionStorage.getItem('refresh'); // or sessionStorage
        const accessToken = sessionStorage.getItem('access');

        if (!refreshToken) {
            console.error("No refresh token found");
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/auth/logout/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({ token: refreshToken })
            });

            const data = await response.json();

            if (response.ok) {
                console.log(data.message);
                sessionStorage.removeItem('access');
                sessionStorage.removeItem('refresh');
                sessionStorage.removeItem('user');
                navigate('/signin');
            } else {
                console.error("Logout failed:", data.error);
                sessionStorage.removeItem('access');
                sessionStorage.removeItem('refresh');
                sessionStorage.removeItem('user');
                navigate('/signin');
            }
        } catch (error) {
            console.error("Logout error:", error.message);
        }
    };

    const { open, openDrawer, closeDrawer } = useContext(DrawerContext);
    return (
        <div className="flex text-black justify-between items-center p-4 bg-white shadow-md">
            <div className='flex items-center gap-2 '>
                <RiMenuFold2Line onClick={openDrawer} className='md:hidden block' />
                <h2 className="text-2xl font-bold text-blue-800">Dream FocuZ</h2>
            </div>

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

                <IoIosLogOut
                    className="text-gray-500 text-2xl cursor-pointer hover:text-blue-500 transition"
                    onClick={logoutUser}

                />
            </div>
        </div>
    );
};

export default Navber;
