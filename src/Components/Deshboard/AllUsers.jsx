// import { useEffect, useState } from "react";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import { data } from "react-router-dom";

// export default function AllUsers() {
//     const [users, setUsers] = useState([]);
//     const [search, setSearch] = useState("");


//     const [editUser, setEditUser] = useState(null);

//     const handleEditClick = (user) => {
//         setEditUser(user);
//     };

//     const handleDeleteClick = (user) => {
//         const id = user.id;
//         fetch(`https://team-focu-z-backend.vercel.app/auth/alluser/${id}/`, {
//             method: "DELETE",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${sessionStorage.getItem("access")}`,
//             },
//         })
//             .then((res) => {
//                 if (res.ok) {
//                     setUsers((prev) => prev.filter((u) => u.id !== id));
//                     console.log("User deleted successfully");
//                 } else {
//                     console.error("Failed to delete user");
//                 }
//             })
//             .catch((err) => {
//                 console.error("Error deleting user:", err);
//             })
//     }

//     const handleSave = (updatedUser) => {
//         setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
//         setEditUser(null);
//     };





//     useEffect(() => {
//         fetch("https://team-focu-z-backend.vercel.app/auth/alluser/", {
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${sessionStorage.getItem("access")}`,
//             },
//         })
//             .then((res) => res.json())
//             .then((data) => setUsers(data))
//             .catch((err) => console.error("Failed to fetch users:", err));
//     }, []);

//     const filteredUsers = users.filter((user) =>
//         (user?.Name || user?.username || "").toLowerCase().includes(search.toLowerCase())
//     );

//     return (
//         <div className="p-6 bg-gray-100 min-h-screen">
//             <div className="flex justify-between items-center mb-6">
//                 <div>
//                     <h2 className="text-2xl font-bold">ইউজার ম্যানেজমেন্ট</h2>
//                     <p className="text-sm text-gray-600">সমস্ত ইউজার পরিচালনা ও নিয়ন্ত্রণ করুন</p>
//                 </div>
//                 <button className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition">
//                     + নতুন ইউজার যোগ করুন
//                 </button>
//             </div>

//             {/* Filter and Search */}
//             <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
//                 <input
//                     type="text"
//                     className="px-4 py-2 border rounded w-full sm:w-1/2"
//                     placeholder="ইউজার খুঁজুন..."
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                 />
//                 <select className="px-4 py-2 border rounded w-full sm:w-1/4">
//                     <option>সব রোল</option>
//                     <option>admin</option>
//                     <option>script writer</option>
//                     <option>video editor</option>
//                     <option>voice artist</option>
//                 </select>
//                 <div className="text-sm text-gray-600 sm:ml-auto">{filteredUsers.length} জন ইউজার</div>
//             </div>

//             {/* Table */}
//             <div className="bg-white rounded-lg shadow overflow-x-auto">
//                 <table className="min-w-full table-auto text-sm text-left">
//                     <thead className="bg-gray-100 text-gray-700">
//                         <tr>
//                             <th className="px-4 py-2">ইউজার</th>
//                             <th className="px-4 py-2">ইমেইল</th>
//                             <th className="px-4 py-2">রোল</th>
//                             <th className="px-4 py-2">টিম</th>
//                             <th className="px-4 py-2">অ্যাকশন</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredUsers.map((user) => (
//                             <tr key={user.id} className="border-t hover:bg-gray-50">
//                                 <td className="px-4 py-3 flex items-center gap-2">
//                                     {user.ProfilePicture ? (
//                                         <img
//                                             src={user.ProfilePicture}
//                                             alt="profile"
//                                             className="w-8 h-8 rounded-full object-cover"
//                                         />
//                                     ) : (
//                                         <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs">
//                                             👤
//                                         </div>
//                                     )}
//                                     <div>
//                                         <p className="font-medium">{user.Name || user.username}</p>
//                                         <p className="text-gray-500 text-xs">{user.username}</p>
//                                     </div>
//                                 </td>
//                                 <td className="px-4 py-3">{user.email}</td>
//                                 <td className="px-4 py-3">
//                                     <span
//                                         className={`px-2 py-1 rounded-full text-white text-xs font-medium ${user.role === "admin"
//                                             ? "bg-red-500"
//                                             : user.role === "script writer"
//                                                 ? "bg-green-500"
//                                                 : user.role === "video editor"
//                                                     ? "bg-purple-500"
//                                                     : user.role === "voice artist"
//                                                         ? "bg-orange-400"
//                                                         : "bg-gray-400"
//                                             }`}
//                                     >
//                                         {user.role}
//                                     </span>
//                                 </td>
//                                 <td className="px-4 py-3">
//                                     {user?.teams ? (
//                                         user?.teams?.map((e, i) =>

//                                             (<span key={i} className="text-sm text-gray-600">{e}</span>)
//                                         )
//                                     ) : (
//                                         <span className="text-sm text-gray-400">কোন টিম নেই</span>
//                                     )}</td>
//                                 <td className="px-4 py-3 flex items-center gap-3 text-lg">
//                                     <button className="text-blue-600 hover:text-blue-800" onClick={() => handleEditClick(user)}>
//                                         <FaEdit />
//                                     </button>
//                                     <button onClick={() => handleDeleteClick(user)} className="text-red-600 hover:text-red-800">
//                                         <FaTrash />
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//             {
//                 editUser && (
//                     <EditUserModal
//                         user={editUser}
//                         onClose={() => setEditUser(null)}
//                         onSave={handleSave}
//                     />
//                 )
//             }
//         </div>
//     );
// }




// function EditUserModal({ user, onClose, onSave }) {
//     const [formData, setFormData] = useState({ ...user });
//     const [teams, setTeams] = useState([]);
//     const [selectedTeam, setSelectedTeam] = useState(null);

//     useEffect(() => {
//         setFormData({ ...user });
//     }, [user]);

//     useEffect(() => {
//         fetch('https://team-focu-z-backend.vercel.app/team/teams/', {
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${sessionStorage.getItem("access")}`,
//             }
//         })
//             .then((res) => res.json())
//             .then((data) => setTeams(data))
//             .catch((err) => console.error("Failed to fetch teams:", err));
//     }, []);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleTeamChange = (e) => {
//         const teamName = e.target.value;
//         setSelectedTeam(teamName);
//     };

//     const handleSubmit = async () => {
//         try {
//             // Update user info including role
//             const res = await fetch(`https://team-focu-z-backend.vercel.app/auth/alluser/${user.id}/`, {
//                 method: "PATCH",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${sessionStorage.getItem("access")}`,
//                 },
//                 body: JSON.stringify(formData),
//             });

//             if (!res.ok) throw new Error("❌ User update failed");

//             const updatedUser = await res.json();

//             // Then update team if selected
//             if (selectedTeam) {
//                 const teamObj = teams.find((t) => t.name === selectedTeam);
//                 if (teamObj) {
//                     let existingUsers = teamObj.users.map((u) => u.id);
//                     if (!existingUsers.includes(user.id)) {
//                         existingUsers.push(user.id);
//                     }

//                     // If the role is 'manager', assign manager
//                     const teamUpdateBody = {
//                         users: existingUsers,
//                         ...(formData.role === "manager" ? { manager: user.id } : {}),
//                     };

//                     const teamRes = await fetch(`https://team-focu-z-backend.vercel.app/auth/team/${teamObj.id}/update/`, {
//                         method: "PATCH",
//                         headers: {
//                             "Content-Type": "application/json",
//                             Authorization: `Bearer ${sessionStorage.getItem("access")}`,
//                         },
//                         body: JSON.stringify(teamUpdateBody),
//                     });

//                     if (!teamRes.ok) throw new Error("❌ Team update failed");
//                     const teamData = await teamRes.json();
//                     console.log("✅ Team updated:", teamData);
//                 }
//             }

//             onSave(updatedUser);
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
//             <div className="bg-white w-[90%] max-w-md p-6 rounded shadow">
//                 <h2 className="text-xl font-bold mb-4">ইউজার সম্পাদনা</h2>

//                 <input className="w-full border p-2 mb-3" name="Name" value={formData.Name || ""} onChange={handleChange} placeholder="নাম" />
//                 <input className="w-full border p-2 mb-3" name="email" value={formData.email || ""} onChange={handleChange} placeholder="ইমেইল" />

//                 <select className="w-full border p-2 mb-3" name="role" value={formData.role || ""} onChange={handleChange}>
//                     <option value="">--রোল বেছে নিন--</option>
//                     <option value="admin">সুপার অ্যাডমিন</option>
//                     <option value="manager">ম্যানেজার</option>
//                     <option value="script writer">স্ক্রিপ্ট রাইটার</option>
//                     <option value="video editor">ভিডিও এডিটর</option>
//                     <option value="voice artist">ভয়েস আর্টিস্ট</option>
//                 </select>

//                 <select className="w-full border p-2 mb-3" name="team" value={selectedTeam || ""} onChange={handleTeamChange}>
//                     <option value="">--টিম বেছে নিন--</option>
//                     {teams.map((team) => (
//                         <option key={team.id} value={team.name}>{team.name}</option>
//                     ))}
//                 </select>

//                 <input className="w-full border p-2 mb-3" name="Phone" value={formData.Phone || ""} onChange={handleChange} placeholder="ফোন" />
//                 <textarea className="w-full border p-2 mb-3" name="Address" value={formData.Address || ""} onChange={handleChange} placeholder="ঠিকানা" />

//                 <div className="flex justify-between">
//                     <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSubmit}>আপডেট করুন</button>
//                     <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={onClose}>বাতিল</button>
//                 </div>
//             </div>
//         </div>
//     );
// }


import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function AllUsers() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [editUser, setEditUser] = useState(null);
    const [teams, setTeams] = useState([]);

    // Fetch all users
    useEffect(() => {
        fetch("https://team-focu-z-backend.vercel.app/auth/alluser/", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("access")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((err) => console.error("Failed to fetch users:", err));
    }, []);

    // Fetch all teams (needed for validation in editing)
    useEffect(() => {
        fetch("https://team-focu-z-backend.vercel.app/team/teams/", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("access")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => setTeams(data))
            .catch((err) => console.error("Failed to fetch teams:", err));
    }, []);

    // Delete user
    const handleDeleteClick = (user) => {
        if (!window.confirm(`Are you sure you want to delete ${user.Name || user.username}?`)) return;

        fetch(`https://team-focu-z-backend.vercel.app/auth/alluser/${user.id}/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("access")}`,
            },
        })
            .then((res) => {
                if (res.ok) {
                    setUsers((prev) => prev.filter((u) => u.id !== user.id));
                    alert("User deleted successfully");
                } else {
                    alert("Failed to delete user");
                }
            })
            .catch((err) => {
                console.error("Error deleting user:", err);
                alert("Error deleting user");
            });
    };

    // Filter users by search and role
    const filteredUsers = users.filter(
        (user) =>
            (user?.Name || user?.username || "")
                .toLowerCase()
                .includes(search.toLowerCase()) &&
            (roleFilter ? user.role === roleFilter : true)
    );

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold">ইউজার ম্যানেজমেন্ট</h2>
                    <p className="text-sm text-gray-600">সমস্ত ইউজার পরিচালনা ও নিয়ন্ত্রণ করুন</p>
                </div>
                <button className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition">
                    + নতুন ইউজার যোগ করুন
                </button>
            </div>

            {/* Filter and Search */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                <input
                    type="text"
                    className="px-4 py-2 border rounded w-full sm:w-1/2"
                    placeholder="ইউজার খুঁজুন..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    className="px-4 py-2 border rounded w-full sm:w-1/4"
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                >
                    <option value="">সব রোল</option>
                    <option value="admin">admin</option>
                    <option value="manager">manager</option>
                    <option value="script writer">script writer</option>
                    <option value="video editor">video editor</option>
                    <option value="voice artist">voice artist</option>
                </select>
                <div className="text-sm text-gray-600 sm:ml-auto">{filteredUsers.length} জন ইউজার</div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full table-auto text-sm text-left">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="px-4 py-2">ইউজার</th>
                            <th className="px-4 py-2">ইমেইল</th>
                            <th className="px-4 py-2">রোল</th>
                            <th className="px-4 py-2">টিম</th>
                            <th className="px-4 py-2">অ্যাকশন</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user.id} className="border-t hover:bg-gray-50">
                                <td className="px-4 py-3 flex items-center gap-2">
                                    {user.ProfilePicture ? (
                                        <img
                                            src={user.ProfilePicture}
                                            alt="profile"
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs">
                                            👤
                                        </div>
                                    )}
                                    <div>
                                        <p className="font-medium">{user.Name || user.username}</p>
                                        <p className="text-gray-500 text-xs">{user.username}</p>
                                    </div>
                                </td>
                                <td className="px-4 py-3">{user.email}</td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`px-2 py-1 rounded-full text-white text-xs font-medium ${user.role === "admin"
                                                ? "bg-red-500"
                                                : user.role === "manager"
                                                    ? "bg-blue-600"
                                                    : user.role === "script writer"
                                                        ? "bg-green-500"
                                                        : user.role === "video editor"
                                                            ? "bg-purple-500"
                                                            : user.role === "voice artist"
                                                                ? "bg-orange-400"
                                                                : "bg-gray-400"
                                            }`}
                                    >
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    {user?.teams && user.teams.length > 0 ? (
                                        user.teams.map((team) => (
                                            <span key={team.id} className="text-sm text-gray-600 mr-2">
                                                {team.name}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-sm text-gray-400">কোন টিম নেই</span>
                                    )}
                                </td>
                                <td className="px-4 py-3 flex items-center gap-3 text-lg">
                                    <button
                                        className="text-blue-600 hover:text-blue-800"
                                        onClick={() => setEditUser(user)}
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(user)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {editUser && (
                <EditUserModal
                    user={editUser}
                    onClose={() => setEditUser(null)}
                    onSave={(updatedUser) => {
                        setUsers((prev) =>
                            prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
                        );
                        setEditUser(null);
                    }}
                    teams={teams}
                    allUsers={users}
                />
            )}
        </div>
    );
}

function EditUserModal({ user, onClose, onSave, teams, allUsers }) {
    const [formData, setFormData] = useState({ ...user });
    const [selectedTeamName, setSelectedTeamName] = useState(
        user?.teams?.[0]?.name || ""
    );

    useEffect(() => {
        setFormData({ ...user });
        setSelectedTeamName(user?.teams?.[0]?.name || "");
    }, [user]);

    // Change handler for inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Change handler for team selection
    const handleTeamChange = (e) => {
        setSelectedTeamName(e.target.value);
    };

    // Helper to find team by name
    const getTeamByName = (name) => teams.find((t) => t.name === name);

    // Submit handler to update user and team
    const handleSubmit = async () => {
        try {
            // Validate manager uniqueness if role is manager
            if (formData.role === "manager") {
                const selectedTeam = getTeamByName(selectedTeamName);
                if (
                    selectedTeam?.manager &&
                    selectedTeam.manager !== user.id
                ) {
                    alert("⚠️ এই টিমে ইতিমধ্যে একজন ম্যানেজার আছে।");
                    return;
                }
            }

            // Update user info first
            const res = await fetch(
                `https://team-focu-z-backend.vercel.app/auth/alluser/${user.id}/`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${sessionStorage.getItem("access")}`,
                    },
                    body: JSON.stringify(formData),
                }
            );
            if (!res.ok) throw new Error("User update failed");
            const updatedUser = await res.json();

            // Remove user from any other teams if changing team
            for (const team of teams) {
                if (
                    team.users.some((u) => u.id === user.id) &&
                    team.name !== selectedTeamName
                ) {
                    const newUsers = team.users.filter((u) => u.id !== user.id);
                    const teamUpdateBody = {
                        users: newUsers.map((u) => u.id),
                        // if manager was user, clear manager on old team
                        ...(team.manager === user.id ? { manager: null } : {}),
                    };
                    const res = await fetch(
                        `https://team-focu-z-backend.vercel.app/auth/team/${team.id}/update/`,
                        {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${sessionStorage.getItem("access")}`,
                            },
                            body: JSON.stringify(teamUpdateBody),
                        }
                    );
                    if (!res.ok)
                        throw new Error("Failed to remove user from old team " + team.name);
                }
            }

            // Add user to selected team
            if (selectedTeamName) {
                const selectedTeam = getTeamByName(selectedTeamName);
                if (!selectedTeam) {
                    alert("Selected team not found");
                    return;
                }
                let updatedUsers = selectedTeam.users.map((u) => u.id);
                if (!updatedUsers.includes(user.id)) {
                    updatedUsers.push(user.id);
                }

                const teamUpdateBody = {
                    users: updatedUsers,
                    ...(formData.role === "manager" ? { manager: user.id } : {}),
                };

                const teamRes = await fetch(
                    `https://team-focu-z-backend.vercel.app/auth/team/${selectedTeam.id}/update/`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${sessionStorage.getItem("access")}`,
                        },
                        body: JSON.stringify(teamUpdateBody),
                    }
                );
                if (!teamRes.ok) throw new Error("Team update failed");
            }

            alert("✅ ইউজার সফলভাবে আপডেট হয়েছে");
            onSave(updatedUser);
        } catch (err) {
            console.error(err);
            alert("❌ আপডেট করতে সমস্যা হয়েছে");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white w-[90%] max-w-md p-6 rounded shadow">
                <h2 className="text-xl font-bold mb-4">ইউজার সম্পাদনা</h2>

                <input
                    className="w-full border p-2 mb-3"
                    name="Name"
                    value={formData.Name || ""}
                    onChange={handleChange}
                    placeholder="নাম"
                />
                <input
                    className="w-full border p-2 mb-3"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                    placeholder="ইমেইল"
                />

                <select
                    className="w-full border p-2 mb-3"
                    name="role"
                    value={formData.role || ""}
                    onChange={handleChange}
                >
                    <option value="">--রোল বেছে নিন--</option>
                    <option value="admin">সুপার অ্যাডমিন</option>
                    <option value="manager">ম্যানেজার</option>
                    <option value="script writer">স্ক্রিপ্ট রাইটার</option>
                    <option value="video editor">ভিডিও এডিটর</option>
                    <option value="voice artist">ভয়েস আর্টিস্ট</option>
                </select>

                <select
                    className="w-full border p-2 mb-3"
                    name="team"
                    value={selectedTeamName || ""}
                    onChange={handleTeamChange}
                >
                    <option value="">--টিম বেছে নিন--</option>
                    {teams.map((team) => (
                        <option key={team.id} value={team.name}>
                            {team.name}
                        </option>
                    ))}
                </select>

                <input
                    className="w-full border p-2 mb-3"
                    name="Phone"
                    value={formData.Phone || ""}
                    onChange={handleChange}
                    placeholder="ফোন"
                />
                <textarea
                    className="w-full border p-2 mb-3"
                    name="Address"
                    value={formData.Address || ""}
                    onChange={handleChange}
                    placeholder="ঠিকানা"
                />

                <div className="flex justify-between">
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                        onClick={handleSubmit}
                    >
                        আপডেট করুন
                    </button>
                    <button
                        className="bg-gray-400 text-white px-4 py-2 rounded"
                        onClick={onClose}
                    >
                        বাতিল
                    </button>
                </div>
            </div>
        </div>
    );
}
