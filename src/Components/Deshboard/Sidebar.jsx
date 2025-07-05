// import { NavLink } from "react-router-dom"
// import { FaHome, FaUsers, FaUser, FaFileAlt, FaUpload, FaChartBar, FaCog } from "react-icons/fa"

// const linkClass = ({ isActive }) =>
//     `flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-700 transition ${isActive ? 'bg-blue-700' : ''}`

// export default function Sidebar() {
//     return (
//         <div className="w-64 bg-blue-900 text-white h-screen p-4 space-y-2">
//             <h1 className="text-xl font-bold text-center mb-6">Team FocuZ</h1>
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
            <h1 className="text-xl font-bold text-center mb-6">Team FocuZ</h1>
            <NavLink to="/dashboard/main" className={linkClass}><FaHome /> ড্যাশবোর্ড</NavLink>

            {
                role === "admin" && (
                    <>

                        <NavLink to="/dashboard/team" className={linkClass}><FaUsers /> টিম ম্যানেজমেন্ট</NavLink>
                        <NavLink to="/dashboard/user" className={linkClass}><FaUser /> ইউজার ম্যানেজমেন্ট</NavLink>
                        <NavLink to="/dashboard/files" className={linkClass}><FaFileAlt /> সব ফাইল</NavLink>
                        <NavLink to="/dashboard/report" className={linkClass}><FaChartBar /> রিপোর্ট</NavLink>
                    </>
                )
            }





            <NavLink to="/dashboard/upload" className={linkClass}><FaUpload /> ফাইল আপলোড</NavLink>
            <NavLink to="/dashboard/myteam" className={linkClass}><FaUpload /> আমার টিম</NavLink>

            <NavLink to="/dashboard/settings" className={linkClass}><FaCog /> সেটিংস</NavLink>
        </div>
    )
}
