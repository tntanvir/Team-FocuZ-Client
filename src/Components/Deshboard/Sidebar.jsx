// import { NavLink } from "react-router-dom"
// import { FaHome, FaUsers, FaUser, FaFileAlt, FaUpload, FaChartBar, FaCog } from "react-icons/fa"

// const linkClass = ({ isActive }) =>
//     `flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-700 transition ${isActive ? 'bg-blue-700' : ''}`

// export default function Sidebar() {
//     return (
//         <div className="w-64 bg-blue-900 text-white h-screen p-4 space-y-2">
//             <h1 className="text-xl font-bold text-center mb-6">Dream FocuZ</h1>
//             <NavLink to="/dashboard" className={linkClass}><FaHome /> ড্যাশবোর্ড</NavLink>
//             <NavLink to="/dashboard/team" className={linkClass}><FaUsers /> টিম ম্যানেজমেন্ট</NavLink>
//             <NavLink to="/dashboard/user" className={linkClass}><FaUser /> ইউজার ম্যানেজমেন্ট</NavLink>
//             <NavLink to="/dashboard/files" className={linkClass}><FaFileAlt /> সব ফাইল</NavLink>
//             <NavLink to="/dashboard/upload" className={linkClass}><FaUpload /> ফাইল আপলোড</NavLink>
//             <NavLink to="/dashboard/report" className={linkClass}><FaChartBar /> রিপোর্ট</NavLink>
//             <NavLink to="/dashboard/settings" className={linkClass}><FaCog /> সেটিংস</NavLink>
//         </div>
//     )
// }


import { NavLink } from "react-router-dom"
import {
    FaHome, FaUsers, FaUser, FaFileAlt,
    FaUpload, FaChartBar, FaCog
} from "react-icons/fa"
import { useEffect, useState } from "react";

const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-700 transition ${isActive ? 'bg-blue-700' : ''}`

export default function Sidebar() {

    const [role, setRole] = useState(null);
    const refreshToken = async () => {
        const refresh = sessionStorage.getItem("refresh");

        if (!refresh) {
            console.warn("No refresh token found. Cannot refresh access token.");
            return;
        }

        try {
            const res = await fetch("https://team-focu-z-backend.vercel.app/auth/refresh/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ refresh }),
            });

            const data = await res.json();

            // ✅ Check if both access and refresh tokens are returned
            if (data.access && data.refresh) {
                sessionStorage.setItem("access", data.access);
                sessionStorage.setItem("refresh", data.refresh);
                console.log("✅ Access and refresh token updated");
            } else if (data.access) {
                sessionStorage.setItem("access", data.access);
                console.log("✅ Access token refreshed (no new refresh token)");
            } else {
                console.warn("⚠️ Failed to get new access token", data);
            }

        } catch (err) {
            console.error("❌ Token refresh failed:", err);
        }
    };

    useEffect(() => {
        const userStr = sessionStorage.getItem("user");
        console.log("Raw user string from sessionStorage:", userStr);

        if (userStr) {
            try {
                const parsedUser = JSON.parse(userStr);
                // console.log("Parsed user:", parsedUser.role);
                setRole(parsedUser.role);

            } catch (err) {
                console.error("Error parsing JSON:", err);
            }
        } else {
            console.warn("No 'user' found in sessionStorage.");
        }
    }, []);
    return (
        <div className="w-64 bg-blue-900 text-white h-screen p-4 space-y-2">
            <h1 className="text-xl font-bold text-center mb-6">Dream FocuZ</h1>
            <NavLink to="/dashboard/main" className={linkClass}><FaHome /> ড্যাশবোর্ড</NavLink>

            {
                role === "admin" && (
                    <>

                        <NavLink to="/dashboard/team" className={linkClass}><FaUsers /> টিম ম্যানেজমেন্ট</NavLink>
                        <NavLink to="/dashboard/user" className={linkClass}><FaUser /> ইউজার ম্যানেজমেন্ট</NavLink>

                        <NavLink to="/dashboard/report" className={linkClass}><FaChartBar /> রিপোর্ট</NavLink>
                    </>
                )
            }



            <NavLink to="/dashboard/files" className={linkClass}><FaFileAlt /> সব ফাইল</NavLink>
            <NavLink to="/dashboard/upload" className={linkClass}><FaUpload /> ফাইল আপলোড</NavLink>
            {role !== "admin" && <NavLink to="/dashboard/myteam" className={linkClass}><FaUpload /> আমার টিম</NavLink>}

            <NavLink to="/dashboard/settings" className={linkClass}><FaCog /> সেটিংস</NavLink>
        </div>
    )
}
