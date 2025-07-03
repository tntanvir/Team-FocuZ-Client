import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function AllUsers() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch("https://team-focu-z-backend.vercel.app/auth/alluser/")
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
                                <td className="px-4 py-3 flex items-center gap-3 text-lg">
                                    <button className="text-blue-600 hover:text-blue-800">
                                        <FaEdit />
                                    </button>
                                    <button className="text-red-600 hover:text-red-800">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
