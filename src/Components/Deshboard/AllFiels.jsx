import React, { useEffect, useState } from "react";
import { FiDownload, FiUser, FiCalendar, FiEye, FiMessageSquare } from "react-icons/fi";

const FileCard = ({ file }) => {
    const getTagStyle = (tag) => {
        switch (tag) {
            case "video": return "bg-purple-100 text-purple-700";
            case "print": return "bg-green-100 text-green-700";
            case "voice": return "bg-orange-100 text-orange-700";
            default: return "bg-gray-200 text-gray-600";
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow p-4  space-y-3">
            {/* Header with Title & Tag */}
            <div className="flex justify-between items-start">
                <h2 className="font-bold text-lg leading-snug">{file.title.slice(0, 18)}...</h2>
                {file.tag && (
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getTagStyle(file.tag)}`}>
                        {file.tag === "video" ? "ভিডিও" : file.tag}
                    </span>
                )}
            </div>

            {/* Description and Info */}
            <p className="text-gray-500 text-sm">ভিডিও • {file.size || "15 MB"}</p>

            <div className="flex items-center gap-2 text-sm text-gray-600">
                <FiUser />
                <span>{file.user ? `ইউজার ${file?.user?.role}` : "ভিডিও এডিটর"}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
                <FiCalendar />
                <span>{new Date(file.uploaded_at).toISOString().slice(0, 10)}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
                <FiDownload />
                <span>৬ বার ডাউনলোড</span>
            </div>

            {/* Tag buttons */}
            <div className="flex gap-2 flex-wrap">
                <span className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded">প্রোমো</span>
                <span className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded">মার্কেটিং</span>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 mt-2">
                <a
                    href={file.file}
                    target="_blank"
                    download={file.title}
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 justify-center bg-blue-600 text-white px-4 py-2 rounded-md text-sm w-full"
                >
                    <FiDownload /> ডাউনলোড
                </a>
                <button className="p-2 border rounded-md text-gray-600 hover:bg-gray-100">
                    <a target="_blank" href={file.file}>

                        <FiEye />
                    </a>
                </button>
                <button className="p-2 border rounded-md text-gray-600 hover:bg-gray-100">
                    <FiMessageSquare />
                </button>
            </div>
        </div>
    );
};

const AllFiels = () => {
    const [files, setFiles] = useState([]);

    const [role, setRole] = useState("");

    useEffect(() => {
        const fetchUserRole = async () => {
            const access = sessionStorage.getItem("access");
            const response = await fetch('https://team-focu-z-backend.vercel.app/auth/profile/', {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });
            const userData = await response.json();
            setRole(userData.role); // Update the role state
        };

        fetchUserRole();
    }, []);

    useEffect(() => {
        if (role === 'admin') {

            fetch("https://team-focu-z-backend.vercel.app/media/data/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("access")}`,
                }
            })
                .then((res) => res.json())
                .then((data) => setFiles(data.results))
                .catch((err) => console.error("Fetch error:", err));
        }
        if (role !== 'admin') {
            fetch("https://team-focu-z-backend.vercel.app/media/admin/data/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("access")}`,
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    setFiles(data)
                    console.log(data)
                })
                .catch((err) => console.error("Fetch error:", err));
        }
    }, [role]);

    return (
        <>
            {role && <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3   gap-6">
                {files.map((file) => (
                    <FileCard key={file.id} file={file} />
                ))}
            </div>}
        </>
    )
};

export default AllFiels;
