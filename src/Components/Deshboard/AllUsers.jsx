import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { data } from "react-router-dom";

export default function AllUsers() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");


    const [editUser, setEditUser] = useState(null);

    const handleEditClick = (user) => {
        setEditUser(user);
    };

    const handleDeleteClick = (user) => {
        const id = user.id;
        fetch(`https://team-focu-z-backend.vercel.app/auth/alluser/${id}/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("access")}`,
            },
        })
            .then((res) => {
                if (res.ok) {
                    setUsers((prev) => prev.filter((u) => u.id !== id));
                    console.log("User deleted successfully");
                } else {
                    console.error("Failed to delete user");
                }
            })
            .catch((err) => {
                console.error("Error deleting user:", err);
            })
    }

    const handleSave = (updatedUser) => {
        setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
        setEditUser(null);
    };





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

    const filteredUsers = users.filter((user) =>
        (user?.Name || user?.username || "").toLowerCase().includes(search.toLowerCase())
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
                <select className="px-4 py-2 border rounded w-full sm:w-1/4">
                    <option>সব রোল</option>
                    <option>admin</option>
                    <option>script writer</option>
                    <option>video editor</option>
                    <option>voice artist</option>
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
                                    {user?.teams ? (
                                        user?.teams?.map((e, i) =>

                                            (<span key={i} className="text-sm text-gray-600">{e}</span>)
                                        )
                                    ) : (
                                        <span className="text-sm text-gray-400">কোন টিম নেই</span>
                                    )}</td>
                                <td className="px-4 py-3 flex items-center gap-3 text-lg">
                                    <button className="text-blue-600 hover:text-blue-800" onClick={() => handleEditClick(user)}>
                                        <FaEdit />
                                    </button>
                                    <button onClick={() => handleDeleteClick(user)} className="text-red-600 hover:text-red-800">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {
                editUser && (
                    <EditUserModal
                        user={editUser}
                        onClose={() => setEditUser(null)}
                        onSave={handleSave}
                    />
                )
            }
        </div>
    );
}



function EditUserModal({ user, onClose, onSave }) {
    const [formData, setFormData] = useState({ ...user });
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        setFormData({ ...user });

    }, [user]);
    useEffect(() => {
        fetch('https://team-focu-z-backend.vercel.app/team/teams/', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("access")}`,
            }
        }).then((res) => res.json())
            .then((data) => setTeams(data))
            .catch((err) => console.error("Failed to fetch teams:", err));
    }, [])

    const handleChange = (e) => {

        if (e.target.value === "manager") {
            // console.log(teams)
            // console.log(formData)
            const data = teams.filter((team) => team.name === formData.teams[0]);
            // console.log(formData.id)
            const users = data[0].users.map((u) => u.id);
            // console.log(users)

            fetch(`https://team-focu-z-backend.vercel.app/auth/team/${formData.id}/update/`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("access")}`,
                },
                body: JSON.stringify({
                    users: users,
                    manager: user.id,
                }),
            })
                .then((res) => {
                    if (res.ok) {
                        console.log("✅ Team updated successfully");
                        setFormData({ ...formData, [e.target.name]: e.target.value });
                        return res.json();
                    } else {
                        throw new Error("❌ Failed to update team");
                    }
                })
                .then((data) => console.log(data))
                .catch((err) => console.error(err));
        }

        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const teamshandleChange = (e) => {
        const selectedTeamName = e.target.value;

        // Find the full team object
        const selectedTeam = teams.find((team) => team.name === selectedTeamName);

        if (selectedTeam) {
            const selectedTeamId = selectedTeam.id;

            // Step 1: Get all existing user IDs
            const existingUserIds = selectedTeam.users.map((u) => u.id);

            // Step 2: Add the current user.id if not already in list
            if (!existingUserIds.includes(user.id)) {
                existingUserIds.push(user.id);
            }

            // Step 3: Send PATCH request with updated user list
            fetch(`https://team-focu-z-backend.vercel.app/auth/team/${selectedTeamId}/update/`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("access")}`,
                },
                body: JSON.stringify({
                    users: existingUserIds,
                }),
            })
                .then((res) => {
                    if (res.ok) {
                        console.log("✅ Team updated successfully");
                        return res.json();
                    } else {
                        throw new Error("❌ Failed to update team");
                    }
                })
                .then((data) => console.log(data))
                .catch((err) => console.error(err));
        } else {
            console.error("❌ Selected team not found");
        }
    };





    const handleSubmit = async () => {
        try {
            const res = await fetch(`https://team-focu-z-backend.vercel.app/auth/alluser/${user.id}/`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem("access")}`,
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                const updatedUser = await res.json();
                onSave(updatedUser);
            } else {
                console.error("Update failed");
            }
        } catch (err) {
            console.error("Error updating user:", err);
        }
        // console.log(JSON.stringify(formData))
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white w-[90%] max-w-md p-6 rounded shadow">
                <h2 className="text-xl font-bold mb-4">ইউজার সম্পাদনা</h2>
                <input className="w-full border p-2 mb-3" name="Name" value={formData.Name || ""} onChange={handleChange} placeholder="নাম" />
                <input className="w-full border p-2 mb-3" name="email" value={formData.email || ""} onChange={handleChange} placeholder="ইমেইল" />
                <select className="w-full border p-2 mb-3" name="role" value={formData.role || ""} onChange={handleChange}>
                    <option value="">--রোল বেছে নিন--</option>
                    <option value="admin">সুপার অ্যাডমিন</option>
                    <option value="manager">ম্যানেজার</option>
                    <option value="script writer">স্ক্রিপ্ট রাইটার</option>
                    <option value="video editor">ভিডিও এডিটর</option>
                    <option value="voice artist">ভয়েস আর্টিস্ট</option>
                </select>

                <select className="w-full border p-2 mb-3" name="role" value={formData.teams || ""} onChange={teamshandleChange}>
                    <option value="">--রোল বেছে নিন--</option>
                    {
                        teams.map((team) => (
                            <option key={team.id} value={team.name}>
                                {team.name}

                            </option>
                        ))
                    }

                </select>
                <input className="w-full border p-2 mb-3" name="Phone" value={formData.Phone || ""} onChange={handleChange} placeholder="ফোন" />
                <textarea className="w-full border p-2 mb-3" name="Address" value={formData.Address || ""} onChange={handleChange} placeholder="ঠিকানা" />
                <div className="flex justify-between">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSubmit}>আপডেট করুন</button>
                    <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={onClose}>বাতিল</button>
                </div>
            </div>
        </div>
    );
}
